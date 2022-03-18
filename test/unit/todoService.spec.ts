import { expect } from "chai";
import faker from 'faker';
import sinon from 'sinon';
import { environment } from '../../src/utils/environment';
import request from "supertest";
// import { mock, when, instance } from "ts-mockito";



describe('simpleGreeting', function() {

    it('should say hello', function() {
        expect(2+2).to.equal(4);
    });

});




// describe('targetedGreeting', function() {

//     it(`should say hello and use the entity's name`, function() {
//         let MockedClass:MyComplicatedDomainModel = mock(MyComplicatedDomainModel);
//         when(MockedClass.name()).thenReturn('Bobby');

//         let bobby = instance(MockedClass);

//         expect(targetedGreeting(bobby)).to.equal('Hello, Bobby!');
//     });

// });