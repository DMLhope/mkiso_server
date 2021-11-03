#[macro_use] extern crate rocket;

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}

#[get("/")]              // <- route attribute
fn world() -> &'static str {  // <- request handler
    "hello, world!"
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![index])
                   .mount("/hello", routes![world])
                   .mount("/hi", routes![world])
}