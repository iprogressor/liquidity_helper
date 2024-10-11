import "@stdlib/deploy";

message Send {
    jettonAddress: Address;
    amount: Int;
}

message FundReply{
    tokens: map<Address, Int>;
    user: Address;
}

contract SimpleHelper with Deployable {

    owner: Address; // fund_addr
    user_addr: Address;
    tokens: map <Address,Int>; 

    init (user_addr: Address ,jetton1: Address ,jetton2: Address ,jetton3: Address) {
        self.owner = sender();
        self.user_addr = user_addr;
        self.tokens = emptyMap();
        self.tokens.set(jetton1, 0);
        self.tokens.set(jetton2, 0);
        self.tokens.set(jetton3, 0);
    }

    receive(msg: Send){
        //require(sender() == self.owner, "only owner is allowed to Send");
        self.tokens.set(msg.jettonAddress,msg.amount);

        let flag: Bool = false;
        foreach (key, value in self.tokens) {
          dump(key);
          dump(value);
          
          if(value == 0 )
          {
            flag = true;
          }  
        }

       // if (flag == false)
      //  {
            self.reply(FundReply{user: self.user_addr, tokens: self.tokens}.toCell());
     //   }
        
    }

    get fun UserAddr(): Address{
        return self.user_addr;
    }

    get fun Tokens(): map<Address,Int> {
        return self.tokens;
    }

    get fun balance(): Int{
        return myBalance();
    }
}








