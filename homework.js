/* DONT CHANGE THIS CODE - START */
function wait(ms = 1000) { return new Promise(resolve => setTimeout(resolve, ms)) }

class Dish {
    constructor(cookingTime) {
        this.cookingTime = cookingTime;
    }

    async cook() {
        const actualCookingTime = this.cookingTime * (1 + Math.random()) * 100;
        await wait(actualCookingTime);
        return this;
    }
}
/* DONT CHANGE THIS CODE - END */

/*
    YOUR CODE HERE
*/


class Ingridient {
    constructor(name, count) {
        this.name = name;
        this.count = count;
    }
}


class Bolognese extends Dish {
    #neededIngridients;

    constructor() {
        super(10);
        this.#neededIngridients = {
            'spaghetti': 1,
            'meat': 1,
            'tomato': 2,
        };
    }

    getIngridients() {
        return this.#neededIngridients;
    }
}


class MashedPotatoes extends Dish {
    #neededIngridients;

    constructor() {
        super(8);
        this.#neededIngridients = {
            'potato': 1,
        };
    }

    getIngridients() {
        return this.#neededIngridients;
    }
}


class Steak extends Dish {
    #neededIngridients;

    constructor() {
        super(7);
        this.#neededIngridients = {
            'meat': 1,
        };
    }

    getIngridients() {
        return this.#neededIngridients;
    }
}


class SteakAndFries extends Dish {
    #neededIngridients;

    constructor() {
        super(15);
        this.#neededIngridients = {
            'meat': 1,
            'potato': 1,
        };
    }

    getIngridients() {
        return this.#neededIngridients;
    }
}


class Kitchen {
    constructor() {
        this.ingridients = {}
        this.orderQueue = []
    }
    
    addToFridge(ingredients) {
        for(const i in ingredients) {
            this.ingridients[ingredients[i].name] = ingredients[i].count;
        }
    }

    order(orderDish) {
        if (this.checkAndReserveIngridients(orderDish)) {
            this.orderQueue.push(orderDish)
        } else {
            throw new Error('Not enough ingridients in fridge!')
        }
    }
    /* When the order is added, the ingridients are immediately reserved for it, if there are any. */
    checkAndReserveIngridients(order) {
        for (const [key, value] of Object.entries(order.getIngridients())) {
            if (this.ingridients[key] < value) {
                return false;
            }
        }
        this.reserveIngridients(order);
        return true;
    }

    reserveIngridients(order) {
        for(const [key, value] of Object.entries(order.getIngridients())) {
            this.ingridients[key] -= value;
        }
    }

    async cookFastestOrder() {
        if (!this.orderQueue.length) {
            throw new Error('There is currently no orders in the queue.')
        }

        let minOrderIdx = 0;
        let minOrderCookingTime = Infinity;

        for (const orderIdx in this.orderQueue) {
            if (this.orderQueue[orderIdx].cookingTime < minOrderCookingTime) {
                minOrderCookingTime = this.orderQueue[orderIdx].cookingTime;
                minOrderIdx = orderIdx;
            }
        }


        let finalOrder = this.orderQueue[minOrderIdx];
        this.orderQueue.splice(minOrderIdx, 1);

        return await finalOrder.cook();
    }

    async cookAllOrders() {
        if (!this.orderQueue.length) {
            throw new Error('There is currently no orders in the queue.')
        }

        let orders = [];

        while(this.orderQueue.length) {
            orders.push(await this.orderQueue.pop().cook())
        }
        
        return orders;
    }
}


async function test() {
    const kitchen = new Kitchen();
    kitchen.addToFridge([
        new Ingridient('potato', 1),
        new Ingridient('spaghetti', 1),
        new Ingridient('meat', 3),
        new Ingridient('tomato', 2)
    ])

    kitchen.order(new Bolognese()); // Bolognese extends Dish (cookingTime = 10)
    kitchen.order(new MashedPotatoes()); // MashedPotatoes extends Dish (cookingTime = 8)
    kitchen.order(new Steak()); // Steak extends Dish (cookingTime = 7)

    // Feel free to experiment with various dishes and ingridients

    await kitchen.cookFastestOrder(); // Returns fastest dish to make
    await kitchen.cookAllOrders(); // Returns two dishes in array

    kitchen.order(new SteakAndFries()); // Throws Error: Not enough ingridients in fridge
    
    // DEBUG
    // console.log(kitchen.orderQueue)
    // console.log(kitchen.ingridients)
}

test();
