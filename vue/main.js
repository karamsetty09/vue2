// In template wverything must be wrapped

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

Vue.component('databinding', {
    template: `
    <div>
    <h4>Data Binding and displaying of user Input:</h4>
    
    <input type="text" v-model="message1">
    
    <p>The value of the input is: {{ message1 }}. </p>
    </div>
    `
    ,

    data(){
        return{
            message1: 'Venkata Sandeep kumar. Karamsetty'
        };
    }
});

new Vue({
    el: '#root',
    data: {                     // create data for the application.
        message: 'Hello vue',        // Data binding used ar line 14 and 15
        names: ['Chandra Mouli Karamsetty', 'Sarala Karamsetty', 'Raj Dheige', 'Dharshana Prabath'], // array list for vue 
        newName: '',                 // Variable to hold user Input at line 21
        title: "I am the title of the Hover button.", // title for the hover button.
        className: 'color-blue',       // using class to call color style.
        isLoading: false,             // setting falsy for botton color.
        tasks:[                         // Collections for display and play
            {description: 'Learning Vue.js', completed: false},
            {description: 'Learning HTML/CSS', completed: true},
            {description: 'Learning Laravel', completed: false},
            {description: 'Learning php', completed: true},
            {description: 'Learning oops', completed: true},
        ]
        },

        methods:{
            addName(){                                  // Method to insert new Name.
                alert('adding name to above array');
                this.names.push(this.newName);
            },
            toogleClass(){                              // Method to load color on click.
                this.isLoading = true;
            },
        },

        computed: {
            reversedMessage(){
                return this.message.split(' ').reverse().join(' ');
            },
            incompleteTasks(){
                return this.tasks.filter(task=> ! task.completed);
            }
        }
});



