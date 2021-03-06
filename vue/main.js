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

Vue.component('product',{
   props:{
        premium:{
            type: Boolean,
            required: true
        }
   },
   template: `
   <div class="product">
        <div class="product-image">
            <img v-bind:src="image">
        </div>

        <div class="product-info">
            <h1>{{title}}</h1>
            <hr></hr>
            <a :href="link" target="_blank">href tab in vue.js</a>
            <p v-if="inStock">In Stock</p>
            <p v-else :class="{ outOfStock: !inStock }">Out of Stock</p>
            <p> User is Premium: {{premium}}</p>
            <p>Shipping: {{shipping}}</p>
            <ul>
            <li v-for="detail in details">{{detail}}</li>
            </ul>
            <hr></hr>

            <div v-for="(variant, index) in variants" 
                :key="variant.variantId"
                class="color-box"
                :style="{ backgroundColor: variant.variantColor }"
                @mouseover="updateProduct(index)">
                
            </div>

            <button v-on:click="addToCart"
            :disabled="!inStock"
            :class="{ disabledButton: !inStock }">
            Add to Cart
            </button>
            
            <button v-on:click="removeFromCart"
            :disabled="!inCart"
            :class="{ disabledButton: !inCart }"
            >
            Remove Item
            </button>

        </div> 
        <hr></hr>

        <product-tabs :reviews="reviews"></product-tabs>
        
    </div>
   `,
   data(){
       return{
        brand: 'Computed brand',
        selectedVariant: 0, // Used for updating color image.
        product: 'Socks',
        // inStock: true,
        // image: './assets/vmSocks-green-onWhite.jpeg',
        link: 'https://v3.vuejs.org/',
        inventory: 9,
        details: ["80% cotton", "20% polyster", "Gender-neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: "green",
                variantImage: './assets/vmSocks-green-onWhite.jpeg',
                variantQuantity: 100
            },
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: './assets/vmSocks-blue-onWhite.jpeg',
                variantQuantity: 50
            }
        ],
        reviews: [],
       }
   },
   methods:{
        onCouponApplied(){
            this.couponApplied = true;
        },
        addToCart(){
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        removeFromCart(){
            this.$emit('remove-at-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct(index){
            this.selectedVariant = index 
        }
    },
    computed:{
        image(){
            return this.variants[this.selectedVariant].variantImage
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },
        title(){
            return this.brand + ' ' + this.product;
        },
        inCart(){
            return this.cart==0 ? false : true ;
        },
        shipping(){
            if(this.premium){
                return "Free"
            }
            return 2.99
        }
    },
    mounted(){
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
    }
})

Vue.component('product-review',{
    template:`
    <form class="review-form" @submit.prevent="onSubmit">
        <h1>Product Review Form:</h1>
        <p>
        <label for="name">Name:</label>
        <textarea id="name" v-model="name"></textarea>
        </p>
        
        <p>
        <label for="review">Review:</label>
        <textarea id="review" v-model="review"></textarea>
        </p>

        <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
        </select>
        </p>
        
        <p>
        <input type="submit" value="Submit">
        </p>
        <p v-if="errors.length">
            <b>please correct the following error(s):</b>
            <ul>
                <li v-for="error in errors">{{error}}</li>
            </ul>
        </p>
    </form>

    `,
    data(){
        return{
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods:{
        onSubmit(){
            if(this.name && this.review && this.rating){
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                eventBus.$emit('review-submitted', productReview)
                this.name=null
                this.review=null
                this.rating = null
            }
            else{
                if(!this.name) this.errors.push("Name required.")
                if(!this.review) this.errors.push("Review required.")
                if(!this.rating) this.errors.push("Rating required.")
            }
            
        }
    },

})

var eventBus = new Vue()

Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template:`
        <div>
            <span class="tab"
                :class="{activeTab: selectedTab === tab}"
                v-for="(tab, index) in tabs" 
                :key="index"
                @click="selectedTab = tab">
                {{ tab }}
            </span>

            <div v-show="selectedTab === 'Reviews'">
            <h2>Reviews</h2>
                <p v-if="!reviews.length"> There are no reviews yet.</P>
                <ul>
                    <li v-for="review in reviews">
                    <p>{{review.name}}</p>
                    <p>Rating: {{review.rating}}</p>
                    <p>{{review.review}}</p>
                    </li>
                </ul>
            </div>

            <product-review 
            v-show="selectedTab === 'Make a Review'">
            </product-review>
            <hr></hr>
        </div>
        

        
    `,
    data(){
        return{
            tabs: ['Reviews', 'Make a Review'],
            selectedTab: 'Reviews'
        }
    }
})

new Vue({
    el: '#root',
    data: {   
        showModal: false, // Used for communication between two components
        showModel: false,
        couponApplied: false,  
        premium: true,
        cart: [],
    },
    methods:{
        onCouponApplied(){
            this.couponApplied = true;
        },
        updateCart(id){
            this.cart.push(id)
        },
        removeCart(id){
            for(var i = this.cart.length - 1; i >= 0; i--) {
                if (this.cart[i] === id) {
                   this.cart.splice(i, 1);
                }
            }
        }
    },
    created(){
        Event.$on('applied', () => alert('Handling it!'));
    }
});





