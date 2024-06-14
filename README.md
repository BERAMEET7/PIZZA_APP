# Realtime Pizza Order Tracker App

## Overview

The Realtime Pizza Order Tracker App is a web application that allows users to place pizza orders and track the status of their orders in real-time. This app is built using Node.js, Express, MongoDB, Tailwind CSS, EJS, and Socket.io. The app provides engaging visual animations for various order statuses to keep customers informed and entertained.

## Live Demo

Check out the live demo of the project: [BERA's PIZZA](https://beras-pizza.onrender.com)

## Features

- **Order Placement**: Users can place pizza orders with their preferred toppings, size, and crust type.
- **Real-time Order Tracking**: Users can track the status of their orders in real-time with engaging animations.
- **Order Statuses**: The app supports multiple order statuses including Order Placed, Order Confirmation, Preparation, Out for Delivery, and Complete.
- **Responsive Design**: The app is fully responsive and works seamlessly on all devices.
- **Authentication**: User authentication is implemented to manage user sessions.

## Tech Stack

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing order and user data.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **EJS**: Embedded JavaScript templates for server-side rendering.
- **Socket.io**: Library for real-time web applications.

## Installation

Follow these steps to set up the project on your local machine:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/BERAMEET7/PIZZA_APP.git
    cd PIZZA_APP
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root directory and add the following variables:
    ```env
    PORT=3000
    MONGO_URI=your_mongodb_uri
    SESSION_SECRET=your_session_secret
    ```

4. **Start the server**:
    ```sh
    npm start
    ```

5. **Access the application**:
    Open your browser and navigate to `http://localhost:3000`.



## Usage

- **Placing an Order**:
  - Navigate to the homepage.
  - Select your preferred pizza options and click on "Place Order".
  - You will be redirected to the order tracking page.

- **Tracking an Order**:
  - The order tracking page will display the current status of your order with animations.
  - The status will automatically update as your order progresses through different stages.

## Animations

The app uses a combination of CSS animations and JavaScript libraries like Animate.css and Lottie to provide engaging visual feedback for each order status. 

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. **Fork the repository**.
2. **Create a new branch**:
    ```sh
    git checkout -b feature/your-feature-name
    ```
3. **Commit your changes**:
    ```sh
    git commit -m 'Add some feature'
    ```
4. **Push to the branch**:
    ```sh
    git push origin feature/your-feature-name
    ```
5. **Create a pull request**.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please reach out to me at [berameet008@gmail.com].

---

Thank you for using the Realtime Pizza Order Tracker App! Enjoy your pizza!


