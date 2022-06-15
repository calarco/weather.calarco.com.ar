const request = require("supertest");
const should = require("should");

describe("GET location", () => {
    it("should fetch location", async () => {
        await request("http://localhost:3000")
            .get("/v1/location")
            .expect(200)
            .expect("Content-Type", "application/json; charset=utf-8")
            .then((res) => {
                res.body.should.have.property("country").and.be.a.String();
                res.body.should.have.property("city").and.be.a.String();
                res.body.should.have.property("lat").and.be.a.Number();
                res.body.should.have.property("lon").and.be.a.Number();
            });
    });
    it("should fetch location/ip", async () => {
        await request("http://localhost:3000")
            .get("/v1/location/200.114.208.113")
            .expect(200)
            .expect("Content-Type", "application/json; charset=utf-8")
            .then((res) => {
                res.body.should.have.property("country").and.be.a.String();
                res.body.should.have.property("city").and.be.a.String();
                res.body.should.have.property("lat").and.be.a.Number();
                res.body.should.have.property("lon").and.be.a.Number();
            });
    });
    it("should fetch error", async () => {
        await request("http://localhost:3000")
            .get("/v1/location/wrong-ip")
            .expect(400)
            .expect("Content-Type", "application/json; charset=utf-8")
            .then((res) => {
                res.body.should.have.property("message").and.be.a.String();
            });
    });
});

describe("GET current", () => {
    it("should fetch current", async () => {
        await request("http://localhost:3000")
            .get("/v1/current")
            .expect(200)
            .expect("Content-Type", "application/json; charset=utf-8")
            .then((res) => {
                res.body.should.have.property("city").and.be.a.String();
                res.body.should.have.property("date").and.be.a.String();
                res.body.should.have.property("weather").and.be.a.String();
                res.body.should.have.property("temp").and.be.a.Number();
                res.body.should.have.property("humidity").and.be.a.Number();
                res.body.should.have.property("pressure").and.be.a.Number();
            });
    });
    it("should fetch current/city", async () => {
        await request("http://localhost:3000")
            .get("/v1/current/-38_-57")
            .expect(200)
            .expect("Content-Type", "application/json; charset=utf-8")
            .then((res) => {
                res.body.should.have.property("city").and.be.a.String();
                res.body.should.have.property("date").and.be.a.String();
                res.body.should.have.property("weather").and.be.a.String();
                res.body.should.have.property("temp").and.be.a.Number();
                res.body.should.have.property("humidity").and.be.a.Number();
                res.body.should.have.property("pressure").and.be.a.Number();
            });
    });
    it("should fetch error", async () => {
        await request("http://localhost:3000")
            .get("/v1/current/wrong-city")
            .expect(400)
            .expect("Content-Type", "application/json; charset=utf-8")
            .then((res) => {
                res.body.should.have.property("message").and.be.a.String();
            });
    });
});

describe("GET forecast", () => {
    it("should fetch forecast", async () => {
        await request("http://localhost:3000")
            .get("/v1/forecast")
            .expect(200)
            .expect("Content-Type", "application/json; charset=utf-8")
            .then((res) => {
                res.body.should.be.instanceof(Array).and.have.lengthOf(5);
                res.body[0].should.have.property("date").and.be.a.String();
                res.body[0].should.have.property("weather").and.be.a.String();
                res.body[0].should.have.property("temp_day").and.be.a.Number();
                res.body[0].should.have.property("temp_eve").and.be.a.Number();
                res.body[0].should.have
                    .property("temp_night")
                    .and.be.a.Number();
                res.body[0].should.have.property("humidity").and.be.a.Number();
                res.body[0].should.have.property("pressure").and.be.a.Number();
            });
    });
    it("should fetch forecast/city", async () => {
        await request("http://localhost:3000")
            .get("/v1/forecast/-38_-57")
            .expect(200)
            .expect("Content-Type", "application/json; charset=utf-8")
            .then((res) => {
                res.body.should.be.instanceof(Array).and.have.lengthOf(5);
                res.body[0].should.have.property("date").and.be.a.String();
                res.body[0].should.have.property("weather").and.be.a.String();
                res.body[0].should.have.property("temp_day").and.be.a.Number();
                res.body[0].should.have.property("temp_eve").and.be.a.Number();
                res.body[0].should.have
                    .property("temp_night")
                    .and.be.a.Number();
                res.body[0].should.have.property("humidity").and.be.a.Number();
                res.body[0].should.have.property("pressure").and.be.a.Number();
            });
    });
    it("should fetch error", async () => {
        await request("http://localhost:3000")
            .get("/v1/forecast/wrong-city")
            .expect(400)
            .expect("Content-Type", "application/json; charset=utf-8")
            .then((res) => {
                res.body.should.have.property("message").and.be.a.String();
            });
    });
});
