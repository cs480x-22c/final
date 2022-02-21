export default class Climber 
{
    constructor(uuid, firstName, lastName)
    {
        this.uuid = uuid
        this.firstName = firstName
        this.lastName = lastName
        this.routeMoves = new RouteMoves()
    }
}

class RouteMoves
{
    constructor()
    {
        //seconds - holdid

        //Time - Hold id
        this.leftHand = new Map()
        this.rightHand = new Map()
        this.rightFoot = new Map()
        this.leftFoot = new Map()

        this.leftHand.set(0, "003")
        this.leftHand.set(6, "")
        this.leftHand.set(10, "006")

        this.rightHand.set(0, "003")
        this.rightHand.set(5, "004")
        this.rightHand.set(10, "")
        this.rightHand.set(11, "006")

        this.leftFoot.set(0, "001")
        this.leftFoot.set(5, "")

        this.rightFoot.set(0, "002")
        this.rightFoot.set(9, "005")

    }

    getHoldsTouching(time)
    {
        return {
            leftHand: this.getHold(this.leftHand, time),
            rightHand: this.getHold(this.rightHand, time),
            leftFoot: this.getHold(this.leftFoot, time),
            rightFoot: this.getHold(this.rightFoot, time),
        }
    }

    //returns hold id
    getHold(limb, desiredTime)
    {
        let earlierTime = -1

        for(let time of limb.keys())
        {
            if(time > desiredTime)
                return limb.get(earlierTime)
            
            earlierTime = time;
        }
        
        return limb.get(earlierTime)
    }    
}