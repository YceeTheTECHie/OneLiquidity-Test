import { environment } from '../../src/utils/environment';
import supertest from 'supertest';
import sinon from 'sinon';
import todo from '../../src/services/index'
import { expect } from 'chai';
import {data} from './todo'

var server = supertest.agent(`${environment.API_URL}`);


describe('Todos', function() {
  afterEach(function() {
    todo.getAllTodos();
  });
  it('should return all the todo items when called', async function() {
    sinon.stub(todo, 'getAllTodos').returns(data);
    const res = await server.get("/todo")
    const { body } = res;
    expect(JSON.stringify(data) === JSON.stringify(body)).to.be.equals;
      
  });
});


