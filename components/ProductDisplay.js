app.component('product-display', {
    props:{
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:
    /*html*/
    `<div class='product-display'>
        <div class='product-container'>
            <div class='product-image'>
                <img v-bind:src='image' alt='green-socks'>
            </div>
            <div class='product-info'>
                <h1>{{ title }}</h1>
                <p v-if='inStock'>In Stock</p>
                <p v-else>Out of stock</p>
                <div>
                    <p>Composition: </p>
                    <ul>
                        <li v-for='detail in details'>{{ detail }}</li>
                    </ul>
                </div>
                <div>
                    <p>Colors:</p>
                    <ul>
                        <li v-for='(variant, index) in variants' :key="variant.id"
                        @mouseover='updateVariant(index)'
                        class='color-circle' 
                        :style='{ backgroundColor: variant.color }'>
                    </li>
                        
                    </ul>
                </div>
            </div>
            <button class="button" 
            :class='{disableButton: !inStock}'
            :disabled = '!inStock'
            @click='addToCart'>
            Add to cart</button>
        </div>
    </div>`,
    data(){
        return {
            cart: 0,
            product: 'Socks',
            brand:'Zalando',
            selectedVariant:0,
            inStock: true,
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
                {id: 2234, color:'Green', image:'./assets/images/vmSocks-green.jpg', quantity: 50},
                {id: 2235, color:'Blue', image:'./assets/images/vmSocks-blue.jpg', quantity: 0}
            ]
        }
    },
    methods:{
        addToCart(){
            this.cart+= 1
        },
        updateVariant(index){
            this.selectedVariant = index
        }
    },
    computed: {
        title(){
            return this.product + ' ' + this.brand
        },
        image(){
            return this.variants[this.selectedVariant].image
        },
        inStock(){
            return this.variants[this.selectedVariant].quantity
        },
        shipping(){
            if(this.premium){
                return 'Free'
            }
            return 2.99
        }
    }
})