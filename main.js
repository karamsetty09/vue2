// In template wverything must be wrapped

Vue.component('message',{
    props: ['title', 'body'],
    template:`
    <article class="message" v-show="isVisible">
            <div class="message-header">
              {{ title }}
              <button class="delete" aria-label="delete" @click="hideModal()"></button>
            </div>
            <div class="message-body">
              {{ body }}
            </div>
    </article>
    `,
    data(){
        return{
            isVisible : true,
        }
    },
    methods:{
        hideModal(){
            this.isVisible = false;
        }
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

Vue.component('modal',{
    template: `
    <div class="modal is-active">
          <div class="modal-background"></div>
          <div class="modal-content">
            <div class="box">
              <slot>
              </slot>
            </div>
            <!-- Any other Bulma elements you want -->
          </div>
          <!-- Comminucation to showModal for making false  -->
          <button class="modal-close is-large" @click="$emit('close')" aria-label="close"></button>
        </div>
    `,
    data(){
        return{

        }
    },
    methods:{

    }
}); 

Vue.component('tabs',{
    template:`
    <div>
    <div class="tabs">
    <ul>
        <li v-for="tab in tabs" :class="{'is-active': tab.isActive }">
        <a href="#" @click="selectTab(tab)">{{ tab.name }}</a>
        </li>
    </ul>
    </div>

    <div class="tabs-details">
        <slot></slot>
    </div>
    </div>
    `,
    data(){
        return { tabs: [] };
    },
    created(){
        this.tabs = this.$children;
    },
    methods:{
        selectTab(selectedTab){
            this.tabs.forEach(tab=>{
                tab.isActive = (tab.name == selectedTab.name)
            });
        }
    }
});

Vue.component('tab',{
    template:`
    <div v-show="isActive"><slot></slot></div>
    `,
    props:{
        name:{ required:true },
        
        selected:{default: false }
    },
    data(){
        return{
            isActive: false
        }
        
    },
    mounted(){
        this.isActive = this.selected;
    }
});

// decoupling from parent child releationship
window.Event = new Vue();

Vue.component('coupon',{
    template:`
    <input placeholder="Enter your coupon code" @blur="onCouponApplied">
    `,
    methods:{
        onCouponApplied(){
            this.$emit('applied');
            Event.$emit('applied');
        }
    }
});

// How to control content in modal for display.

Vue.component('model',{
    template:`
    
    <div class="modal is-active">
        <div class="modal-background"></div>

        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">
                    <slot name="header"></slot>
                </p>
                <button class="delete" @click="$emit('close')" aria-label="close"></button>
            </header>

            <section class="modal-card-body">
                <slot>
                    Default content if data didn't passed.
                </slot>

            </section>

            <footer class="modal-card-foot">
                <slot name="footer">
                <button class="button is-success">Okay</button>
                </slot>
            </footer>
        </div>
    </div>
    
    `
});

// one off oneline component example
// component with no template.
Vue.component('progress-view',{
    data(){
        return { completionRate : 50 };
    }
});

// Trying forms for display.

Vue.component('forms',{
    template:`
    <div>
    <h1>forms</h1>
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
})

new Vue({
    el: '#root',
    data: {   
        showModal: false, // Used for communication between two components
        showModel: false,
        couponApplied: false,
        product: 'Socks',
        inStock: true,
        image: './assets/vmSocks-green-onWhite.jpeg',
        link: 'https://v3.vuejs.org/',
        inventory: 9,
        details: ["80% cotton", "20% polyster", "Gender-neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: "green",
                variantImage: './assets/vmSocks-green-onWhite.jpeg'
            },
            {
                varaintId: 2235,
                variantColor: "blue",
                variantImage: './assets/vmSocks-blue-onWhite.jpeg'
            }
        ],
        cart: 0
    },
    methods:{
        onCouponApplied(){
            this.couponApplied = true;
        },
        addToCart(){
            this.cart +=1;
        },
        removeFromCart(){
            this.cart -=1;
        },
        updateProduct: function(variantImage){
            this.image = variantImage
        }
    },
    created(){
        Event.$on('applied', () => alert('Handling it!'));
    }
});





