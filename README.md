#Add the dependencies required for this project, including Express, TypeScript, Jasmine, Eslint, and Prettier. Complete your package.json file

############################################## DONE ##############################################

#Set up your project structure. Create folders and files for what you anticipate you will need for the project. (routes missing)

############################################## DONE ##############################################

#Configure your middleware and dependencies. You have quite a few dependencies that all need to work together. Sometimes it's easiest to write some simple js functions to test that all of your dependencies work together before you begin adding any functionality.

############################################## DONE ##############################################

scenario put url: http://localhost:8000/images?filename=img1.jpg&width=300&height=400

if(http://localhost:8000/images?filename=img1.jpg) exist
return it from server

else return not found

if(width and height are number and photo exist in our folder & !resized before with same origins)

return resized image with width and height

if(alreadyexist)
return;
