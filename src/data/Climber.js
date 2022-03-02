export default class Climber 
{
    constructor(uuid, firstName, lastName, climbLength, routeMoves)
    {
        this.uuid = uuid
        this.firstName = firstName
        this.lastName = lastName
        this.routeMoves = new RouteMoves(routeMoves, climbLength)
    }


}

class RouteMoves
{
    constructor(routeMoves, climbLength)
    {
        this.climbLength = +climbLength
        this.leftHand = this._parseJsonToMap(routeMoves.leftHand)
        this.rightHand = this._parseJsonToMap(routeMoves.rightHand)
        this.rightFoot = this._parseJsonToMap(routeMoves.rightFoot)
        this.leftFoot = this._parseJsonToMap(routeMoves.leftFoot)
    }

    _parseJsonToMap(jsonMap)
    {
        let map = new Map()
        Object.entries(jsonMap).forEach(move => {
            map.set(+move[0], move[1])
        })

        return map
    }

    getHoldsTouching(seconds, frame)
    {
        let time = seconds + (frame * .01)
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
            if(+time > desiredTime)
                return limb.get(earlierTime)
            
            earlierTime = time;
        }
        
        return limb.get(earlierTime)
    }    
}