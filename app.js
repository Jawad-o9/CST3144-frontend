const { createApp } = Vue;

const BASE_URL = "http://localhost:3000";

const myClub = createApp({
    data() {
        return {
            sitename: "Jawad's after School Club",
            products: [],  // fetchData() fills this from the server now no need to use the product.js ig
            showProduct: true,
            cart: [],
            sortBy: "title",
            sortOrder: "asc",
            baseUrl: BASE_URL,
            orderDetails: {
                firstName: '',
                lastName: '',
                phone: '',
                email: '',
                address: '',
            }
        };
    },
    created() {
        this.fetchData();
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
        },
        sortedProducts: function () {

            let productsArray = this.products.slice(0);

            let sortBy = this.sortBy;
            let sortOrder = this.sortOrder;

            function compare(a, b) {
                if (a[sortBy] > b[sortBy]) {
                    return sortOrder === "asc" ? 1 : -1;
                }

                if (a[sortBy] < b[sortBy]) {
                    return sortOrder === "asc" ? -1 : 1;
                }

                return 0; // if equal
            }

            return productsArray.sort(compare); // returns sorted copy
        },
        canSubmitOrder() { // validation to allow submission only if cart is not empty and details are valid
            let nameRegex = /^[A-Za-z]+$/;
            let phoneRegex = /^[0-9]+$/;
            return this.cart.length > 0 &&
                nameRegex.test(this.orderDetails.firstName) &&
                nameRegex.test(this.orderDetails.lastName) &&
                phoneRegex.test(this.orderDetails.phone);
        }
    },
    methods: {
        async fetchData() {
            const url = BASE_URL + "/lessons";  // match the port in server.js also 
            let response = await (fetch(url));
            this.products = await response.json();
        },
        addToCart(product) {
            if (this.canAddToCart(product)) {
                this.cart.push(product.id);  // push just the id number, not the whole object(made that mistake once lol)
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
        },
        cartCount(id) {
            let count = 0;
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i] === id) {
                    count++;
                }
            }
            return count;
        },
        removeFromCart(product) {
            const index = this.cart.indexOf(product.id);
            if (index !== -1) {
                this.cart.splice(index, 1);
                product.availableInventory++;
            }
        },
        submitCheckout() {
            alert("Order submitted successfully!");
            this.cart = [];
            this.orderDetails.firstName = '';
            this.orderDetails.lastName = '';
            this.orderDetails.phone = '';
            this.orderDetails.email = '';
            this.orderDetails.address = '';
            this.showProduct = true;
        }
    }
});

myClub.mount('#app');
