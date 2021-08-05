// In template wverything must be wrapped

Vue.component('message',{
    props: ['title', 'body'],
    template:`
    <article class="message">
            <div class="message-header">
              {{ title }}
              <button class="delete" aria-label="delete"></button>
            </div>
            <div class="message-body">
              {{ body }}
            </div>
    </article>
    `,
    data(){
        return{

        }
    },
    methods:{

    }
});

Vue.component('task', {
    template: '<li><slot></slot></li>',
});

Vue.component('top', {
    template: `
    <!-- coloring using className -->
    <div>
    <h1 :class="className">
    <center>
    {{message}}
    </center>
    </h1>
    </div>
    `,
    data(){
        return{
            message: 'Welcome to Vue.js',
            className: 'color-blue',
        };
    }
});

Vue.component('databinding', {
    template: `
    <div>
    <h4>Data Binding and displaying of user Input:</h4>
    <input type="text" v-model="message">
    <p>The value of the input is: {{ message }}. </p>
    </div>
    `
    ,

    data(){
        return{
            message: 'Hello vue',        // Data binding used ar line 14 and 15
        };
    }
});

Vue.component('array',{
    template: `
    <div>
    <h4>Display of array:</h4>
        <ul>
            <li v-for="name in names" v-text="name"></li>
        </ul>
        <input id="input" type="text" v-model="newName" >
        <!-- v-on: === @ and v-on:keyUp="addName" -> used for differnt user actions to input.-->
        <button @click="addName">Add Name</button>
    </div>
    `,
    data(){
        return{
            names: ['Chandra Mouli Karamsetty', 'Sarala Karamsetty', 'Raj Dheige', 'Dharshana Prabath'], // array list for vue  
            newName: '',  // Variable to hold user Input
        }
    }, 
    methods:{
        addName(){                                  // Method to insert new Name.
            alert('adding name to above array');
            this.names.push(this.newName);
        }
    }
});

Vue.component('buttons',{
    template:`
    <div>
    <!-- we can remove v-bind in below button -->
    <button v-bind:title="title">Hover Over Me</button>
    <!-- On click color change of buttons -->
    <button :class="{ 'is-loading': isLoading }" @click="toogleClass">Click Will change button color</button>
    </div>
    `,
    data(){
        return{
            title: "I am the title of the Hover button.", // title for the hover button.
            isLoading: false,             // setting falsy for botton color.
        }
    },
    methods:{
        toogleClass(){                              // Method to load color on click.
            this.isLoading = true;
        }
    },
});

Vue.component('datecomputed',{
    template:`
    <div>
    <!-- Display of Date -->
    <h3 v-text="new Date()"></h3>
    <!-- splitting and reversing message: It's not good practice -> Make use of computed properties of vue instance. -->
    <h2>  Using Computed Property of vue.js  </h2>
    <h3>  Correct Way - Using vue's computed property: {{reversedMessage}}  </h3>
    <h3>  Wronge Way - direct way: {{message.split(' ').reverse().join(' ') }}  </h3> 
    </div>
    `,
    data(){
        return{
            message: 'Hello World'
        }
    },
    computed:{
        reversedMessage(){
            return this.message.split(' ').reverse().join(' ');
        }
    }
});

Vue.component('logictasks',{
    template:`
    <div>
    <h1 :class="{ 'color-orange': true }"><center>Working with collections</center></h1>
        <ul>
            <h3 :class="{'color-blue': true}">Tasks Completed:</h3>
            <li v-for="task in tasks" v-if="task.completed" v-text="task.description"></li>
            <h3 :class="{'color-red': true}">Tasks InComplete:</h3>
            <li v-for="task in tasks" v-if="!task.completed" v-text="task.description"></li>
            <h3 :class="{'color-red': true}">Another way of InComplete tasks using computed of vue.js</h3>
            <li v-for="task in incompleteTasks" v-text="task.description"></li>
        </ul>
    </div>
    `,
    data(){
        return{ 
        tasks:[                         // Collections for display and play
            {description: 'Learning Vue.js', completed: false},
            {description: 'Learning HTML/CSS', completed: true},
            {description: 'Learning Laravel', completed: false},
            {description: 'Learning php', completed: true},
            {description: 'Learning oops', completed: true},
        ],
        className: 'color-blue',       // using class to call color style.
        }
    },
    methods:{
       
    },
    computed:{
        incompleteTasks(){
            return this.tasks.filter(task=> ! task.completed);
        }
    },
});
new Vue({
    el: '#root',
    data: {    
        }
});



