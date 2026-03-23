import { ChatRoom } from './mediators/chat-room';
import { User } from './participants/user';

const room = new ChatRoom();
const alice = new User('a1', 'Alice', room);
const bob = new User('b1', 'Bob', room);
const charlie = new User('c1', 'Charlie', room);

function runExample(): void {
  console.log('Mediator Pattern — Chat Room\n');

  alice.send('Hello everyone!');
  bob.send('Hi Alice!');
  charlie.send('Hey both!');

  console.log('Alice received:', alice.receivedMessages);
  console.log('Bob received:', bob.receivedMessages);
  console.log('Charlie received:', charlie.receivedMessages);
}

runExample();
