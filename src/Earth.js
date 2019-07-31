import React, { Component } from 'react';
import axios from 'axios';
import M from 'materialize-css';
import { EPIC_URL, API_KEY } from './properties';
import LoadingCmpt from './loading';



class Earth extends Component {
    //https://epic.gsfc.nasa.gov/api/natural

    state = {
        images: false,
        dates: false,
        dateSelected: false
    }


    componentWillMount() {
        this.getImages();
        this.avaliableDates();
    }

    avaliableDates = () => {
        axios.get(`${EPIC_URL}/api/natural/available`).then((result) => {
            this.setState({ dates: result.data }, () => {
                M.FormSelect.init(document.querySelectorAll('select'), {});
            })
        });
    }



    getImages() {

        this.setState({ images: false }, () => {


            let url = `${EPIC_URL}/api/natural`;

            if (this.state.dateSelected) {
                url += `/date/${this.state.dateSelected}`
            }

            url += API_KEY;
            axios.get(url).then((result) => {
                this.setState({ images: result.data }, () => {
                    M.Materialbox.init(document.querySelectorAll('.materialboxed'), {});
                    M.FormSelect.init(document.querySelectorAll('select'), {});
                });
            }).catch((error) => {

            })
        })
    }

    changeDate = (event) => {

        let dateSelected = event.target.value;

        this.setState({ dateSelected }, () => {
            this.getImages();
        })

    }
    render() {

        return (
            <div className="row">
                <div className="col s12">
                    {
                        this.state.images ?
                            <React.Fragment>
                                {
                                    this.state.dates ?
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <select onChange={this.changeDate} value={this.state.dateSelected}>
                                                    <option value="" disabled defaultValue>Selecciona una Fecha</option>
                                                    {
                                                        this.state.dates.map((value, index) => {
                                                            return (
                                                                <option value={value} key={index}>{value}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <label>Fecha:</label>
                                            </div>
                                        </div>
                                        : null
                                }
                                <div className="row" style={{ background: "black" }}>
                                    {
                                        this.state.images.map((value, index) => {
                                            return this.renderImages(value);
                                        })
                                    }
                                </div>
                            </React.Fragment>
                            :
                            <LoadingCmpt />
                    }
                </div>
            </div>
        )
    }

    renderImages(value) {

        let { image, caption, date, identifier } = value;

        let dateToPath = this.formatDate(date);

        let urlImage = `${EPIC_URL}/archive/natural/${dateToPath}/png/${image}.png`;

        console.log(dateToPath)

        return (
            <div className="col s3" key={identifier}>
                <img className="responsive-img materialboxed" src={urlImage} alt={caption}  />
            </div>
        )
    }

    formatDate = (date) => {
        var d = new Date();
        if (date) {
            d = new Date(date)
        }

        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        let year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('/');
    }

}


export default Earth;