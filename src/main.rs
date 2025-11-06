use askama::Template;
use axum::{
    response::{Html, IntoResponse},
    routing::get,
    Router
};
//use serde::Deserialize;
use tower_http::services::ServeDir;
use tower_http::set_header::SetResponseHeaderLayer;
use http::header::{CACHE_CONTROL, HeaderValue};
use tower_layer::Layer;
// #[derive(Debug, Deserialize)]
// struct FrontMatter {
//     title: String,
//     date: String,
//     slug: String,
// }

// #[derive(Debug)]
// struct Post {
//     title: String,
//     date: String,
//     slug: String,
//     html: String,
// }

// #[derive(Template)]
// #[template(path = "post.html")]
// struct PostTemplate<'a> {
//     post: &'a Post,
// }

// Template struct automatically binds to templates/hello.html
#[derive(Template)]
#[template(path = "index.html")]
struct IndexTemplate<'a> {
    title: &'a str,
//    name: &'a str,
}



// handler function
async fn index_handler() -> impl IntoResponse {
    let template = IndexTemplate { title: "sifirai coming soon" };
    Html(template.render().unwrap())
}


#[tokio::main]
async fn main() {
    let static_files = ServeDir::new("static");
//        .append_index_html_on_directories(false);

    let vite_dist = ServeDir::new("web/dist");


    let app = Router::new()
        .route("/", get(index_handler))
        // serve statuic files under /static/
        //.nest_service("/static", ServeDir::new("static"));
        .nest_service(
        "/chat", vite_dist)
        .nest_service(
        "/static",
        SetResponseHeaderLayer::if_not_present(
            CACHE_CONTROL,
            HeaderValue::from_static("public, max-age=31536000"),
        )
        .layer(static_files)



    );

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3003")
        .await
        .unwrap();
    axum::serve(listener, app).await.unwrap();
}

