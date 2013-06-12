# FileServer

## Objective
Create a very *crude* way to download a single file. 

## Usage
Edit `server.js` and set the variables `filename` and `contentType` for the 
downloadable file. The port is also configurable.

Then run it.

	`node server.js`

## Limitations

There are a number of limitations to this application. It was intended as a personal learning exercise. 
* It's hard coded to serve one file only.
* It doesn't filter out `POST` requests.
* Probably more I don't know about.

Thare are a number of static file server frameworks around that are much more flexible. Consider using the following:

* [node-static](https://github.com/cloudhead/node-static)
* [node-paperboy](https://github.com/felixge/node-paperboy)
* [http-server](https://github.com/nodeapps/http-server)
