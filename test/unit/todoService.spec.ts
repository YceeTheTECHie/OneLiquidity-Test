import { expect } from "chai";
import { environment } from '../../src/utils/environment';
import supertest from 'supertest';

var server = supertest.agent(`${environment.API_URL}`);


describe("Todo Actions", function() {
   
    var id = ''
    it("Todo Created successfully!", async function () {
        const response = await server.post("/todo").send({ label: "firing" });
        expect(response.body.statusCode).to.be.equal(200);
        expect(response.body.message).to.be.equal("Todo added successfully!");
        expect(response.body.data.id).to.be.a('string');
        expect(response.body.data.label).to.be.a('string');
        expect(response.body.data.completed).to.be.a('boolean');
        expect(response.body.data.createdAt).to.be.a('string');
        expect(response.body.data.updatedAt).to.be.a('string');
        expect(response.body.error).to.be.empty;
        expect(true).to.be.true;
        id = response.body.data.id;
    });


      it("Get Single Todo Successfully!", async function () {
        const response = await server.get(`/todo/${id}`);
        expect(response.body.statusCode).to.be.equal(200);
        expect(response.body.message).to.be.equal("Todo retrieved successfully!");
        expect(response.body.data.id).to.be.a('string');
        expect(response.body.data.label).to.be.a('string');
        expect(response.body.data.completed).to.be.a('boolean');
        expect(response.body.data.createdAt).to.be.a('string');
        expect(response.body.data.updatedAt).to.be.a('string');
        expect(response.body.error).to.be.empty;
          expect(true).to.be.true;
        id = response.body.data.id;
          
    });


     it("Todo Updated successfully!", async function () {
        const response = await server.put(`/todo/${id}`).send({ label: "firing", completed: true});
        expect(response.body.statusCode).to.be.equal(200);
        expect(response.body.message).to.be.equal("Todo updated successfully!");
        expect(response.body.data.id).to.be.a('string');
        expect(response.body.data.completed).to.be.a('boolean');
        expect(response.body.data.createdAt).to.be.a('string');
        expect(response.body.data.updatedAt).to.be.a('string');
         expect(response.body.error).to.be.empty;
        id = response.body.data.id;

         
     });
    
    
    it("Todo Deleted Successfully!", async function () {
        const response = await server.delete(`/todo/${id}`);
        expect(response.body.statusCode).to.be.equal(200);
        expect(response.body.message).to.be.equal("Todo deleted successfully!");
        expect(response.body.data).to.be.empty;
        expect(response.body.error).to.be.empty;
        
    });

       it("Unable to delete unexistent todo id!", async function () {
        const response = await server.delete("/todo/62efee2a-93f3-491b-a180-4d05f3b0947e");
        expect(response.body.statusCode).to.be.equal(400);
        expect(response.body.message).to.be.equal("Bad request");
        expect(response.body.data).to.be.empty;
        expect(response.body.error).to.not.be.empty   
       });
    
        it("Cannot add todo with empty requests", async function () {
        const response = await server.post("/todo").send({ label: "" });
        expect(response.body.statusCode).to.be.equal(400);
        expect(response.body.message).to.be.equal("Validation Failed!");
        expect(response.body.data).to.be.empty;
        expect(response.body.error).to.not.be.empty;
        expect(true).to.be.true;
         
        });
    
    
        it("Cannot update todo with empty requests", async function () {
        const response = await server.post("/todo").send({ label: "", completed: "" });
        expect(response.body.statusCode).to.be.equal(400);
        expect(response.body.message).to.be.equal("Validation Failed!");
        expect(response.body.data).to.be.empty;
        expect(response.body.error).to.not.be.empty;
        expect(true).to.be.true;
         
        });

})

