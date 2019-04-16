import React, { Component } from 'react';

class MyFormMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            globalTitle: '',
        }
        this.onChange = this.onChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.titleChange = this.titleChange.bind(this);
    };
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    submitForm(e) {
        e.preventDefault();
        alert('Titre Envoyé');
    }

    titleChange(e) {
        this.setState({
            globalTitle: `Mon Formulaire - ${this.state.title}`
        });
    }

    componentDidMount(){
        console.log("Formulaire rendu")
    }
    componentDidUpdate() {
        console.log("Caractère changé")
    }

    render() {

        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        };

        const url = "http://92.175.11.66:3001/api/quests/movies";

        fetch(url, config)
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    alert(res.error);
                } else {
                    /*alert(`Film ajouté avec l'ID ${res}!`);*/
                }
            }).catch(e => {
                console.error(e);
                alert('Erreur lors de l\'ajout d\'un film');
            });

        return (

            <div className="FormMovie">
                <h1>{this.state.globalTitle}</h1>

                <form onSubmit={this.submitForm}>
                    <fieldset>
                        <legend>Informations</legend>
                        <div className="form-data">
                            <label htmlFor="name">Title :</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                onChange={this.onChange}
                                value={this.state.title}
                            />
                        </div>
                        <hr />
                        <div className="form-data">
                            <input onClick={this.titleChange} type="submit" value="Envoyer" />
                        </div>
                    </fieldset>
                </form>
            </div>

        )
    }
}


export default MyFormMovie;