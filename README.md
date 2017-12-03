# RESTful-Burger-Manager

## A node/express/sequelize/mysql/handlebars with RESTful API app to create burgers and eat them,

This is an app to practice RESTful APIs, with a simple front end. 

The main page is rendered through handlebars, however any submission is re-rendered through AJAX and jquery. Basically, this is add an item, rerender the page, click on 'eat it' to move it to the other side of the page, or 'delete' it.  It's a simple front end to CRUD routes.

## Routes:

### * GET ROUTES 
  * / Renders the main page. *Does NOT return JSON*
  * /api or /api/all returns JSON of all 'burger' entries
  * /api/eaten Returns JSON of all 'eaten' burgers
  * /api/noteaten Returns JSON of all 'uneaten' burgers
  * /api/:id Returns JSON of a specific burger ID
### * POST ROUTES
  * /api/add Creates a new 'burger' entry
### * PUT ROUTES
  * /api/eatburger/:id 'eats' the 'burger' entry, sets the "is_eaten" boolean flag to true in mysql
### * DELETE ROUTES
  * /api/delete/:id Destroys the 'burger' entry
  

## Technologies Used:
* RESTful API
* Handlebars for Templating
* NodeJS
* Express Server
* AJAX
* MySQL

## Libraries Used
* jQuery
* Bootstrap 3
* Express Server
* Sequelize ORM
* pm2 for daemonizing node processes
* FontAwesome Icons
