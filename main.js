Vue.component('task', {
    template: '<li><slot></slot></li>',
});

Vue.component('heading', {
    template: '<h1>{{name}}</h1>',

    data(){
        return{
            name: 'Venkata Sandeep kumar. Karamsetty'
        };
    }
});


new Vue({
    el: '#root'
});



