const test = require('tape');

module.exports = (app) => {
  test('add Category ', (t) => {
    const App1 = {
      uuid: "762934-19234-123495-12354",
      title: "Errand",
      description: "A better Trello",
      thumbnail: "/IMG.jpg"
    }
    t.plan(1)
    const app_address = app.call("happs", "main", "create_app", App1);
    t.equal(app_address.length, 46)
    console.log("APP ADDRESS:: ",app_address);

    const App2 = {
      uuid: "762934-1234534-123495-12354",
      title: "Lisa",
      description: "A better Lisa",
      thumbnail: "/IMG.jpg"
    }
    t.plan(2)
    const app_address2 = app.call("happs", "main", "create_app", App2);
    t.equal(app_address2.length, 46)
    console.log("APP ADDRESS:: ",app_address2);

    t.plan(3)
    const result1 = app.call("categories", "main", "add_category", {category:"Zo",tag:"El",hash:app_address})
    t.equal(result1.rawResult, "QmNxNShLF57uqNfPLEkAMBPCkdf87AtsVvXDhVQXABmyfR")

    t.plan(4)
    const result2 = app.call("categories", "main", "add_category", {category:"Zo",tag:"El",hash:app_address2})
    t.equal(result2.rawResult, "QmVAZWU7bwjTiQYN5FNgYRGG24bV2UPbPP8K6XqKvC1WbD")

    t.plan(5)
    const result3 = app.call("categories", "main", "get_apps_by_category", {category:"Zo"})
    t.equal(result3.length, 2)

  })
}