### Scripts

- Install: `npm install`
- Build: `npm run build`
- lint: `npm run lint`
- format: `npm run format`
- Test: `npm run test`
- Start server: `npm run start`
- remove build folder: `npm run clean`

### Usage

- npm install
- create file like .env.example called .env before build project
- npm run build
- npm run dev

#### Brief instructions

http://localhost:port/

#### Endpoint to resize images

http://localhost:port/images

Expected query arguments are:

- _filename_: Available filenames are:
  - icelandwaterfall.jpeg
  - img1.jpg
  - img2.jpg
- _width_: numerical pixel value > 0
- _height_: numerical pixel value > 0

#### Example 1

http://localhost:8000/images
Will display a hint and list available image names

#### Example 2

http://localhost:8000/images?filename=icelandwaterfall.jpeg
it will display the original icelandwaterfall image.

#### Example 3

http://localhost:8000/images?filename=icelandwaterfall.jpeg&width=400&height=500
it will resize image with width and height then save it in build folder

#### Example 4

http://localhost:3000/api/images?filename=icelandwaterfall.jpeg&width=-400&height=200
will ignore coordinates and show origin image.
