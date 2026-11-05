const { createApp } = Vue;

const myClub = createApp({
    data() {
        return {
            sitename: "Jawad's after School Club",
            products: productsArray,
            showProduct: true,
            cart: [],
        };
    },
    computed: {
        cartItemCount() {
            return this.cart.length;
        },
        fullName() {
            return this.orderDetails.firstName + ' ' + this.orderDetails.lastName;
        },
        checkoutForm() {
            return this.OrderDetails;
        }
    },
    methods: {
        addToCart(product) {
            if (this.canAddToCart(product)) {
                this.cart.push(product.id);  // push just the id number, not the whole object
                product.availableInventory--;
            } else {
                alert("Out of stock");
            }
        },
        addItem(product) {
            this.addToCart(product);
        },
        showCheckout() {
            this.showProduct = !this.showProduct;
        },
        canAddToCart(product) {
            return product.availableInventory > 0;
        }
    }
});

myClub.mount('#app');
