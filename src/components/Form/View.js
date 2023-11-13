import { Component } from 'react';
import axios from 'axios';
// import { fetchData } from '../../components/Crud/Crud';

class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toUpdate: false,
            appname: '',
        };
    }

    async componentDidMount() {
        await this.fetchData();
    }

    fetchData = async () => {
        const id = this.getID();

        if (id !== null) {
            try {
                const response = await axios.get(`assetlift/${this.state.appname}/${id}`);
                const data = response.data;

                this.setAttributes(data);
                this.setState({ toUpdate: true });
            } catch (error) {
                this.handleError('Error fetching data from the server:', error);
            }
        }
    };

    // getExternalData(app) {
    //     fetchData(app)
    //         .then((data) => {
    //             // Faça algo com os dados
    //             console.log('Data:', data);
    //         })
    //         .catch((error) => {
    //             // Lidar com erros
    //             console.error('Error:', error);
    //         });
    // }

    getID = () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        return urlParams.get('id');
    };

    setAttributes = (data) => {
        this.setState({
            ...data,
        });
    };

    handleChange = (event) => {
        const { id, value } = event.target;
        this.setState({ [id]: value });
        console.log({ [id]: value });
    };

    handleSubmit = async () => {
        const { id, appname, toUpdate, ...data } = this.state;
        const url = toUpdate ? `/assetlift/${appname}/${id}` : `assetlift/${appname}`;
        const method = toUpdate ? 'put' : 'post';

        try {
            const response = await axios({
                method,
                url,
                data,
            });

            console.log('Data sent successfully:', response.data);
            window.location.href = `${appname}s`;
        } catch (error) {
            this.handleError('Error sending data:', error);
        }
    };

    handleError = (message, error) => {
        console.error(message, error);
        // Error handling logic if needed
    };

}

export default View;
