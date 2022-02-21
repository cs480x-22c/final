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

        this.leftHand.set(0, "001")
        this.leftHand.set(3, "002")
        this.leftHand.set(6, "003")

        this.rightHand.set(0, "001")
        this.rightHand.set(3, "002")
        this.rightHand.set(6, "003")

        this.leftFoot.set(0, "001")

        this.rightFoot.set(1, "002")

    }

    getHoldsTouching(time)
    {
        return {
            leftHand: this.getHold(this.leftHand, time),
            rightHand: this.getHold(this.rightFoot, time),
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