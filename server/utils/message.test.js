const expect=require('expect');

var {generateMessage,generateLocationMessage}=require('./message');

describe('generateMessage',()=>{

    it('should generate correct message object',()=>{
        var from='kk';
        var text="kay kay";
        var message=generateMessage(from,text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,text});
    });
});

describe('generateLocationMessage',()=>{

    it('should ling to new location page',()=>{
        var from="vishal";
        var latitude=19;
        var longitude=15;
        var url="https://www.google.com/maps?q=19,15";
        var message=generateLocationMessage('vishal',15,19);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,url});


    })
})