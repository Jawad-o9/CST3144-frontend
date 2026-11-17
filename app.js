const { createApp } = Vue;

const myClub = createApp({
    data() {
        return {
            sitename: "Jawad's after School Club",
            products: [],  // fetchData() fills this from the server now no need to use the product.js ig
            showProduct: true,
            cart: [],
            sortBy: "title",
            sortOrder: "asc",
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
        }
    },
    methods: {
        async fetchData() {
            const url = "http://localhost:3000/";  // match the port in server.js also 
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
        }
    }
});

myClub.mount('#app');
