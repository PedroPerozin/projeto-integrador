import React, { Component } from 'react';

import {
     Form,
} from 'reactstrap';


import axios, { post } from 'axios';

class ImportarCSV extends Component{

    constructor(props) {
        super(props);
    
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
    }

    onSubmit(e) {
        e.preventDefault()
        this.fileUpload(this.state.file).then((response) => {
            //console.log(response.data);
        })
    }
    onChange(e) {
        this.setState({ file: e.target.files[0] })
        
    }
    fileUpload(file) {
        const url = '';
        const formData = new FormData();
        formData.append('file', file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        //console.log(this.state.file)
        return post(url, formData, config)
    }

    render(){
        return(
            <div>
                <Form onSubmit={this.onSubmit}>
                        <input type="file" onChange={this.onChange}></input>
                        <button type="submit">Enviar</button>

                    </Form>
                {/* <input placeholder="importar csv"/> */}
            </div>
        )
    }
}

export default ImportarCSV;