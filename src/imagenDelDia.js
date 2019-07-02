import React, { Component } from 'react';
import axios from 'axios';
import M from 'materialize-css';
import { BASE_URL, API_KEY } from './properties';
import LoadingCmpt from './loading';

class ImagenDelDia extends Component {

    state = {
        date: this.formatDate,
        urlImage: false,
        title: "",
        explanation: "",
        dateImage: ""
    }

    componentWillMount() {
        this.getImage();
    }

    getImage = () => {

        let urlService = `${BASE_URL}/planetary/apod${API_KEY}`;
        if (this.state.date) {
            urlService += `&date=${this.state.date}`;
        }
        axios.get(urlService).then((result) => {
            let { url, title, explanation, date } = result.data;
            this.setState({ urlImage: url, title, explanation, dateImage: date }, () => {
                M.Materialbox.init(document.querySelectorAll('.materialboxed'), {});
                M.Datepicker.init(document.querySelectorAll('.datepicker'), {
                    format: "yyyy-mm-dd",
                    maxDate: new Date(),
                    onSelect: this.changeDate
                });
                
            })
        }).catch((error) => {

        })

    }

    render() {
        return (
            <div className="row">
                <div className="col s12">
                    {
                        this.state.urlImage ?
                            this.renderImage()
                            :
                            <LoadingCmpt />
                    }
                </div>
            </div>
        )
    }

    changeDate = (value) => {
        this.setState({ date: this.formatDate(value),urlImage:false }, () => {
            this.getImage();
        });
    }


    renderImage() {
        return (
            <div className="row">
                <div className="col s12 m8 offset-m2 center-align">
                    <h5>Imagen del día {this.state.dateImage}</h5>
                </div>
                <div className="col s12 m8 offset-m2">
                    <input type="text" className="datepicker"
                        placeholder="Elegir Otra Fecha" />
                </div>
                <div className="col s12 m8 offset-m2">
                    <div className="card">
                        <div className="card-image">
                            <img className="materialboxed responsive-img" src={this.state.urlImage} alt={this.state.title} />
                            <span className="card-title">{this.state.title}</span>
                        </div>
                        <div className="card-content">
                            <p>{this.state.explanation}</p>
                        </div>
                    </div>
                </div>
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

        return [year, month, day].join('-');
    }
}

export default ImagenDelDia;