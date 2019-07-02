import React, { Component } from 'react';
import axios from 'axios';
import M from 'materialize-css';
import { BASE_URL, API_KEY, CAMERAS_MARS } from './properties';
import LoadingCmpt from './loading';

class MarsRover extends Component {

    state = {
        dataFromMars: false,
        camera: "",
        loading: true,
        page: 0
    }

    componentWillMount() {
        this.getImagesFromMars();
    }

    validPage(page) {

        if (page <= 0) {
            page = 1;
        }

        return page;
    }

    getImagesFromMars = (count) => {
        let page = this.state.page;
        debugger;

        if (count) {
            page = this.validPage((page + count));
        } else {
            page = 1;
        }
        this.setState({ dataFromMars: false }, () => {
            let url = `${BASE_URL}/mars-photos/api/v1/rovers/curiosity/photos${API_KEY}&sol=1000&page=${page}`;
            if (this.state.camera.trim() !== "") {
                url += `&camera=${this.state.camera}`
            }

            axios.get(url).then((result) => {
                let dataFromMars = [];

                if (result.data.photos.length > 0) {
                    dataFromMars = result.data.photos;
                } else {
                    page = this.validPage((page - 1));;
                }

                this.setState({ dataFromMars, page }, () => {
                    M.FormSelect.init(document.querySelectorAll('select'), {});
                    M.Materialbox.init(document.querySelectorAll('.materialboxed'), {});
                });
            }).catch((error) => {

            })
        });
    }

    changeCamera = (event) => {

        let camera = event.target.value;

        this.setState({ camera, page: 1 }, () => {
            this.getImagesFromMars();
        })

    }


    render() {

        return (
            <div className="row">
                <div className="col s12 m10 offset-m1">
                    {
                        this.state.dataFromMars ?
                            <React.Fragment>
                                <div className="row">
                                    <div className="col s12 m10">
                                        <div className="input-field col s12">
                                            <select onChange={this.changeCamera} value={this.state.camera}>
                                                <option value="" disabled defaultValue>Selecciona una camara</option>
                                                <option value="">Todas</option>
                                                {
                                                    CAMERAS_MARS.map((value, index) => {
                                                        return (
                                                            <option value={value.name} key={index}>{value.full_name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <label>Camara:</label>
                                        </div>
                                    </div>
                                </div>
                                {this.renderButtons()}
                                <div className="row flexImageRovers">
                                    {
                                        this.state.dataFromMars.map((value, index) => {
                                            return this.showImage(value)
                                        })
                                    }
                                </div>
                                {this.renderButtons()}

                            </React.Fragment>
                            :
                            <LoadingCmpt />
                    }
                </div>
            </div>
        )
    }

    renderButtons() {
        return (
            <div className="row">

                <div className={`col ${this.state.page > 1 ? "s4" : "s6"} left-align`}>
                    <button className="waves-effect btn-flat"
                        onClick={this.getImagesFromMars.bind(this, -1)}
                    ><i className="material-icons left">arrow_back</i>Anterior</button>
                </div>

                {
                    this.state.page > 1 ?
                        <div className="col s4 center-align">
                            <button className="waves-effect btn"
                                onClick={() => {
                                    this.setState({ page: 1 }, () => {
                                        this.getImagesFromMars();
                                    })
                                }}
                            >Inicio</button>
                        </div>
                        : null
                }

                <div className={`col ${this.state.page > 1 ? "s4" : "s6"} right-align`}>
                    <button className="waves-effect btn-flat"
                        onClick={this.getImagesFromMars.bind(this, 1)}
                    ><i className="material-icons right">arrow_forward</i>Siguiente</button>
                </div>
            </div>
        )
    }

    showImage(value) {
        let { img_src, camera, id, earth_date } = value;
        return (<div className="col s12 m3" key={id}>
            <div className="row">
                <div className="col s12">
                    <div className="card">
                        <div className="card-image materialboxed">
                            <img src={img_src} alt={camera.full_name} className="responsive-img"></img>
                        </div>
                        <div className="card-content">
                            <p>Fecha: {earth_date}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>)


    }

}


export default MarsRover;