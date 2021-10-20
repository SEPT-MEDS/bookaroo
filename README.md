# Bookaroo - SEPT Major Assignment Semester 2 2021

Bookaroo is an online book sharing platform that allows users to explore, purchase, and share their favourite books! The service provided is one that allows a user to sell, purchase, or swap books with other users or shop owners in the easiest way possible. 

## Authors

Maxwell Reid - s3787033

Ewan Breakey - s3845382

Thomas Dib - s3838765

Sefanur Erciyas - s3842307



## Functionality

There are three user types; customer, business, and admin, each of which with their own set of functions that are as follows:

- Static pages
  - Contact page - list of contact details of Bookaroo, input form to send us an email
  - About us page - general information about Bookaroo itself
  - 404 page not found page - error page displayed on pages without configured routes
  - 403 no access page - error page displayed on pages when the user does not have access

- Sign up/registration
  - Sign up as customer - limited functionality, account instantly accessible
  - Sign up as business - more functionality, account locked until admin approval

- View books within the system
  - Ability to filter by ISBN, title, author, and or category
  - View listings made of a particular book
  - Make or view reviews made for a particular book
- Listings
  - Create a listing of a book
    - Customers can only create listings for pre-owned books
    - Businesses can create listings for pre-owned or brand new books
    - Admins cannot create listings
  - View a specific listing including the vendor, price, and attributes of that listing
  - Cancel a listing belonging to you
  - A listing may also be a "swap" which indicates that there is no price
- Purchases
  - Purchase a listing via the PayPal API
  - Cancel a purchase within 2 hours of original purchase time
  - View purchase history
    - Customers will see the books they have previously purchased
    - Businesses will see all books they have personally sold
    - Admins will see every transaction within the system
- Profiles
  - View the current listings of a given user
  - View the current reviews + ratings of a given user (or create one yourself!)
- Reviews + Ratings
  - Add a review + rating of a particular book - displayed while users are browsing that book
  - Add a review + rating of a user - displayed on the profile of that user



Admins have some additional functionality which are as follows:

- Add book to system without creating listing
- Edit book details
- Delete a book (and all listings associated with it) from the system
- View history of all transactions that have taken place in the system
- Manage users - approve/suspend accounts



## Website

The project is deployed and available at https://www.weboughtthisdomainforyoudale.xyz.



## Installation

**Latest Release**

The first method of installation is using the latest release. To do this, please navigate to the [previous releases of Bookaroo](https://github.com/SEPT-MEDS/bookaroo/releases). 

Click on the latest release (the top of the page)

Download the zip or tar.gz file and extract it to a location of your choice.

Navigate to the backend directory (`cd backend`) and build and start the microservices using `./build && docker-compose up`.

Wait until the services have loaded - This may take a few minutes

In another terminal, navigate to the frontend directory (`cd frontend`) and start the react app using `npm start`. This should open a website in your browser with the url http://localhost:3000.

Once the services have loaded, the site should be up and running, ready for you to shop!



**Git**

The GitHub Repository can be found [here](https://github.com/SEPT-MEDS/bookaroo). 

Clone the repository using `git clone https://github.com/SEPT-MEDS/bookaroo.git` in a terminal of your choice

Navigate to the backend directory (`cd backend`) and build and start the microservices using `./build && docker-compose up`.

Wait until the services have loaded - This may take a few minutes

In another terminal, navigate to the frontend directory (`cd frontend`) and start the react app using `npm start`. This should open a website in your browser with the url http://localhost:3000.

Once the services have loaded, the site should be up and running, ready for you to shop!





## Version History

The previous releases of Bookaroo can be found [here](https://github.com/SEPT-MEDS/bookaroo/releases).

**v0.1.0** - Sep 8 2021

- Account creation for users and businesses
- Account authentication (log in & log out)
- View home page (listing of books)
- View book details page (clicking on a book)
- View about us page
- View contact us page

**v0.2.0** - Sep 18 2021

- Book listings page
- Listing creation
- Book creation
- Swap listings creation
- Admin dashboard
- Complete search functionality

**v0.2.1** - Sep 18 2021

- Resolves issue of async method returning null on application first load

**v0.3.0** - Oct 7 2021

- Review books
- Rate books (star rating)
- Review users/merchants
- Rate users/merchants
- Order books via PayPal
- Cancel orders within 2 hours of placing them
- View order/transaction history
- Admins view transaction report

**v0.3.1** - Oct 7 2021

- Database configuration for unit tests on new services

**v1.0.0** - Oct 20 2021

- Admin approve shop owner accounts
- Admin decline shop owner accounts
- Admin suspend user
- Admin unsuspend user
- Admin delete user
- Admin add book (without creating listing)
- Admin edit book
- Admin delete book
- Shop owner remove listing
- Customer remove listing





