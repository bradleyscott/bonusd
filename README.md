# bonusd
A ledger, RESTful API and web UI to support a peer-driven bonus system

## What is a peer-driven bonus system?
Pro-social or peer-driven bonus systems are a novel type of bonus spent on others rather than on oneself. 
Recent research has found that offering people bigger bonuses to perform tasks actually made them do worse—once a bonus gets big enough. 
It becomes a distraction and a counterproductive source of stress. And now a team of psychologists has found that a bonus makes us happiest if we’re not allowed to spend it on ourselves. 
### Research and articles about pro-social / peer-driven bonus systems
* Harvard Business School working paper - Prosocial Bonuses Increase Employee Satisfaction and Team Performance (http://www.hbs.edu/faculty/Pages/item.aspx?num=44800)
* Bloomberg Business - The Best Bonus Is One You Can't Spend on Yourself (http://www.bloomberg.com/bw/articles/2013-05-15/the-best-bonus-is-one-you-cant-spend-on-yourself)
* Harvard Business review - The Bonus Employees Really Want, Even If They Don’t Know It Yet(https://hbr.org/2013/10/the-bonus-employees-really-want-even-if-they-dont-know-it-yet/)
* Bonus.ly - A Look At Google’s Peer-To-Peer Bonus System (http://blog.bonus.ly/a-look-at-googles-peer-to-peer-bonus-system/)

## What is bonusd?
Employers need a system- manual or otherwise to support a peer-driven bonus system. bonusd intends to support 

## What makes up bonusd?
* A ledger of balances implemented using a local instance of the blockchain
* A RESTful API that wraps the blockchain and implements business logic specific to the bonus system. For example, gifting rate limits and bonus distributions
* A web UI that can be used by employees

## Why use the blockchain?
Why not? The blockchain is not essential to the implementation of bonusd. The distributed ledger concept does not add a lot. 
However, the blockchain has out-of-the-box support for ledger balances, transaction histories, insufficient funds controls, etc. 
Plus, I wanted to learn a bit more about how the blockchain works. 
