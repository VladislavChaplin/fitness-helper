import axios from '../../core/axios';

export default {
    get: () => axios.get('/users'),
    add: values => axios.post('/users', values),
    remove: id => axios.delete('/users/' + id),
    show: id => axios.get('/users/' + id),
};