var objPositions = {};

function buildMovement(whichMovement, speed)
{
    var objMovement = {};

    if(whichMovement == 'entityBullet')
    {
        objMovement = buildEntityBullet(speed);
    }
    else if(whichMovement == 'notepad0')
    {
        objMovement = buildNotepad0Movement(speed);
    }
    else if(whichMovement == 'notepadplusplus0')
    {
        objMovement = buildNotepadPlusPlus0Movement(speed);
    }
    else if(whichMovement == 'notepadplusplus1')
    {
        objMovement = buildNotepadPlusPlus1Movement(speed);
    }
    else if(whichMovement == 'far0')
    {
        objMovement = buildFar0Movement(speed);
    }
    else if(whichMovement == 'eclipse0')
    {
        objMovement = buildEclipse0Movement(speed);
    }
    else if(whichMovement == 'eclipse1')
    {
        objMovement = buildEclipse1Movement(speed);
    }
    else if(whichMovement == 'eclipse2')
    {
        objMovement = buildEclipse2Movement(speed);
    }
    else if(whichMovement == 'eclipse3')
    {
        objMovement = buildEclipse3Movement(speed);
    }
    else if(whichMovement == 'eclipse4')
    {
        objMovement = buildEclipse4Movement(speed);
    }
    else if(whichMovement == 'dreamweaver0')
    {
        objMovement = buildDreamweaver0Movement(speed);
    }
    else if(whichMovement == 'muleStudio0')
    {
        objMovement = buildMuleStudio0Movement(speed);
    }
    else if(whichMovement == 'intelliJ0')
    {
        objMovement = buildIntelliJ0Movement(speed);
    }
    else if(whichMovement == 'intelliJ1')
    {
        objMovement = buildIntelliJ1Movement(speed);
    }
    else if(whichMovement == 'intelliJ2')
    {
        objMovement = buildIntelliJ2Movement(speed);
    }
    else if(whichMovement == 'netbeans0')
    {
        objMovement = buildNetbeans0Movement(speed);
    }
    else if(whichMovement == 'netbeans1')
    {
        objMovement = buildNetbeans1Movement(speed);
    }
    else if(whichMovement == 'floor')
    {
        objMovement = buildFloorMovement(speed);
    }
    else if(whichMovement == 'playerSleeping' || whichMovement == 'pit1' || whichMovement == 'pit2' || whichMovement == 'pit3' || whichMovement == 'pit4')
    {
        objMovement = buildGroundMovement(speed);
    }
    else if(whichMovement == 'floorInit')
    {
        objMovement = buildFloorInitMovement(speed);
    }
    else if(whichMovement == 'stationary')
    {
        objMovement = buildStationaryMovement(speed);
    }
    else if(whichMovement == 'leftSwoop')
    {
        objMovement = buildLeftSwoopMovement(speed);
    }
    else if(whichMovement == 'rightSwoop')
    {
        objMovement = buildRightSwoopMovement(speed);
    }
    else if(whichMovement == 'leftSimpleZigZag')
    {
        objMovement = buildLeftSimpleZigZagMovement(speed);
    }
    else if(whichMovement == 'rightSimpleZigZag')
    {
        objMovement = buildRightSimpleZigZagMovement(speed);
    }
    else if(whichMovement == 'leftBox')
    {
        objMovement = buildLeftBoxMovement(speed);
    }
    else if(whichMovement == 'rightBox')
    {
        objMovement = buildRightBoxMovement(speed);
    }
    else if(whichMovement == 'leftX')
    {
        objMovement = buildLeftXMovement(speed);
    }
    else if(whichMovement == 'rightX')
    {
        objMovement = buildRightXMovement(speed);
    }
    else if(whichMovement == 'leftBackAndForth')
    {
        objMovement = buildLeftBackAndForthMovement(speed);
    }
    else if(whichMovement == 'rightBackAndForth')
    {
        objMovement = buildRightBackAndForthMovement(speed);
    }
    else if(whichMovement == 'centerBoxes')
    {
        objMovement = buildCenterBoxesMovement(speed);
    }
    else if(whichMovement == 'tombstone')
    {
        objMovement = buildTombstoneMovement(speed);
    }

    return objMovement;
}

function buildPositions()
{
    objPositions.left = [-350, -100];
    objPositions.right = [850, -100];
    objPositions.center = [400, -100];
    objPositions.middle = [375, 350];
    objPositions.straightLeft = [-350, 0];
    objPositions.tombstone = [150, -2123];
    objPositions.rightTombstone = [600,0];
    objPositions.leftTombstone = [0,0];
    objPositions.centerTombstone = [300,0];

    objPositions.pit1 = [0,-210];
    objPositions.pit2 = [200,-210];
    objPositions.pit3 = [400,-210];
    objPositions.pit4 = [600,-210];

    objPositions.player = [0,0];
    objPositions.laptop = [0,0];
    objPositions.entity = [0,0];
    objPositions.entityBullet = [0,0];

    objPositions.getPosition = function(whichPosition)
    {
        var returnPosition = [0,0];

        if(whichPosition == 'bullet' || whichPosition == 'bulletBig' || whichPosition == 'bulletUpperLeft' || whichPosition == 'bulletUpperRight' || whichPosition == 'bulletLeft' || whichPosition == 'bulletRight' || whichPosition == 'laptop' || whichPosition == 'playerSleeping')
        {
            var playerPosition = objLevel.player.getPos();

            returnPosition = [playerPosition[0] + 20, playerPosition[1]];
        }
        else if(whichPosition == 'explosion')
        {
            var laptopPosition = objLevel.laptop.getPos();
            returnPosition = [laptopPosition[0] - 138, laptopPosition[1] - 138];
        }
        else
        {
            returnPosition = objPositions[whichPosition];
        }

        return returnPosition;
    };

    objPositions.setPosition = function(whichPosition, aryCoordinates)
    {
        objPositions[whichPosition] = [aryCoordinates[0],aryCoordinates[1]];
    };
}

function buildEntityBullet(speed)
{
    var objMovement = {};

    objMovement.speed = speed;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy = {x: positionX, y: positionY};

        xy.y += objMovement.speed;

        return xy;
    };

    return objMovement;
}

function buildNotepad0Movement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy = {x: positionX, y: positionY};

        xy.y -= objMovement.speed * (objPlayer.IDE.notepad.speed / 100);

        return xy;
    };

    return objMovement;
}

function buildNotepadPlusPlus0Movement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;
    objMovement.segment = 0;
    objMovement.counter = 0;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy = {x: positionX, y: positionY};

        if(objMovement.segment == 0)
        {
            xy.x -= objMovement.speed * (objPlayer.IDE.notepadplusplus.speed / 100);
            xy.y -= objMovement.speed * (objPlayer.IDE.notepadplusplus.speed / 100);

            objMovement.counter += 1;

            if(objMovement.counter == 5)
            {
                objMovement.segment += 1;
            }
        }
        else
        {
            xy.y -= objMovement.speed * (objPlayer.IDE.notepadplusplus.speed / 100);
        }

        return xy;
    };

    return objMovement;
}

function buildNotepadPlusPlus1Movement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;
    objMovement.segment = 0;
    objMovement.counter = 0;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy = {x: positionX, y: positionY};

        if(objMovement.segment == 0)
        {
            xy.x += objMovement.speed * (objPlayer.IDE.notepadplusplus.speed / 100);
            xy.y -= objMovement.speed * (objPlayer.IDE.notepadplusplus.speed / 100);

            objMovement.counter += 1;

            if(objMovement.counter == 5)
            {
                objMovement.segment += 1;
            }
        }
        else
        {
            xy.y -= objMovement.speed * (objPlayer.IDE.notepadplusplus.speed / 100);
        }

        return xy;
    };

    return objMovement;
}

function buildFar0Movement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy = {x: positionX, y: positionY};

        xy.y -= objMovement.speed * (objPlayer.IDE.far.speed / 100);

        return xy;
    };

    return objMovement;
}

function buildEclipse0Movement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy = {x: positionX, y: positionY};

        xy.y -= objMovement.speed * (objPlayer.IDE.eclipse.speed / 100);

        return xy;
    };

    return objMovement;
}

function buildEclipse1Movement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy = {x: positionX, y: positionY};

        xy.y -= (objMovement.speed * (objPlayer.IDE.eclipse.speed / 100)) / 1.5;
        xy.x -= (objMovement.speed * (objPlayer.IDE.eclipse.speed / 100)) / 1.5;

        return xy;
    };

    return objMovement;
}

function buildEclipse2Movement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy = {x: positionX, y: positionY};

        xy.y -= (objMovement.speed * (objPlayer.IDE.eclipse.speed / 100)) / 1.5;
        xy.x += (objMovement.speed * (objPlayer.IDE.eclipse.speed / 100)) / 1.5;

        return xy;
    };

    return objMovement;
}

function buildEclipse3Movement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy = {x: positionX, y: positionY};

        xy.x -= objMovement.speed * (objPlayer.IDE.eclipse.speed / 100);

        return xy;
    };

    return objMovement;
}

function buildEclipse4Movement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy = {x: positionX, y: positionY};

        xy.x += objMovement.speed * (objPlayer.IDE.eclipse.speed / 100);

        return xy;
    };

    return objMovement;
}

function buildDreamweaver0Movement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy = {x: positionX, y: positionY};

        xy.y -= objMovement.speed * (objPlayer.IDE.dreamweaver.speed / 100);

        return xy;
    };

    return objMovement;
}

function buildMuleStudio0Movement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy = {x: positionX, y: positionY};

        xy.y -= objMovement.speed * (objPlayer.IDE.muleStudio.speed / 100);

        return xy;
    };

    return objMovement;
}

function buildIntelliJ0Movement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;
    objMovement.segment = 0;
    objMovement.counter = 0;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy = {x: positionX, y: positionY};

        if(objMovement.segment == 0)
        {
            xy.x -= objMovement.speed * (objPlayer.IDE.intelliJ.speed / 100);
            xy.y -= objMovement.speed * (objPlayer.IDE.intelliJ.speed / 100);

            objMovement.counter += 1;

            if(objMovement.counter == 10)
            {
                objMovement.segment += 1;
            }
        }
        else
        {
            xy.y -= objMovement.speed * (objPlayer.IDE.intelliJ.speed / 100);
        }

        return xy;
    };

    return objMovement;
}

function buildIntelliJ1Movement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy = {x: positionX, y: positionY};

        xy.y -= objMovement.speed * (objPlayer.IDE.intelliJ.speed / 100);

        return xy;
    };

    return objMovement;
}

function buildIntelliJ2Movement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;
    objMovement.segment = 0;
    objMovement.counter = 0;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy = {x: positionX, y: positionY};

        if(objMovement.segment == 0)
        {
            xy.x += objMovement.speed * (objPlayer.IDE.intelliJ.speed / 100);
            xy.y -= objMovement.speed * (objPlayer.IDE.intelliJ.speed / 100);

            objMovement.counter += 1;

            if(objMovement.counter == 10)
            {
                objMovement.segment += 1;
            }
        }
        else
        {
            xy.y -= objMovement.speed * (objPlayer.IDE.intelliJ.speed / 100);
        }

        return xy;
    };

    return objMovement;
}

function buildNetbeans0Movement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;
    objMovement.segment = 0;
    objMovement.counter = 0;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy = {x: positionX, y: positionY};

        if(objMovement.segment == 0)
        {
            xy.x -= objMovement.speed * (objPlayer.IDE.netbeans.speed / 100);
            xy.y -= objMovement.speed * (objPlayer.IDE.netbeans.speed / 100);

            objMovement.counter += 1;

            if(objMovement.counter == 10)
            {
                objMovement.segment += 1;
            }
        }
        else
        {
            xy.y -= objMovement.speed * (objPlayer.IDE.netbeans.speed / 100);
        }

        return xy;
    };

    return objMovement;
}

function buildNetbeans1Movement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;
    objMovement.segment = 0;
    objMovement.counter = 0;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy = {x: positionX, y: positionY};

        if(objMovement.segment == 0)
        {
            xy.x += objMovement.speed * (objPlayer.IDE.netbeans.speed / 100);
            xy.y -= objMovement.speed * (objPlayer.IDE.netbeans.speed / 100);

            objMovement.counter += 1;

            if(objMovement.counter == 10)
            {
                objMovement.segment += 1;
            }
        }
        else
        {
            xy.y -= objMovement.speed * (objPlayer.IDE.netbeans.speed / 100);
        }

        return xy;
    };

    return objMovement;
}

function buildFloorInitMovement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;
    objMovement.percent = 0;

    objMovement.calculateMove = function(positionX, positionY)
    {
        objMovement.percent += ((1 / 12) * objMovement.speed);

        var xy = straightLine({x: 0, y: -94}, {x: 0, y:930}, objMovement.percent/100);

        xy.y += objMovement.speed;

        return xy;
    };

    return objMovement;
}

function buildFloorMovement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;
    objMovement.percent = 0;

    objMovement.calculateMove = function(positionX, positionY)
    {
        objMovement.percent += ((1 / 20) * objMovement.speed);

        var xy = straightLine({x: 0, y: -710}, {x: 0, y:1005}, objMovement.percent/100); //-710 - 850 -- 155

        xy.y += objMovement.speed;

        return xy;
    };

    return objMovement;
}

function buildGroundMovement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy = {x: positionX, y: positionY};

        xy.y += objMovement.speed;

        return xy;
    };

    return objMovement;
}

function buildStationaryMovement(speed)
{
    var objMovement = {};

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy = {x: positionX, y: positionY};

        return xy;
    };

    return objMovement;
}

function buildLeftSimpleZigZagMovement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;
    objMovement.percent = 0;
    objMovement.segment = 0;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy;

        objMovement.percent += ((1 / 100) * objMovement.speed);

        if(objMovement.segment == 0)
        {
            xy = straightLine({x: -50, y: 0}, {x: 772, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 1)
        {
            xy = straightLine({x: 772, y: 0}, {x: 772, y:300}, objMovement.percent/100);
        }
        else if(objMovement.segment == 2)
        {
            xy = straightLine({x: 772, y: 300}, {x: 0, y:300}, objMovement.percent/100);
        }
        else if(objMovement.segment == 3)
        {
            xy = straightLine({x: 0, y: 300}, {x: 0, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 4)
        {
            xy = straightLine({x: 0, y: 0}, {x: 772, y:0}, objMovement.percent/100);
        }

        if(objMovement.percent == 100)
        {
            objMovement.percent = 0;

            if(objMovement.segment == 4)
            {
                objMovement.segment = 1;
            }
            else
            {
                objMovement.segment += 1;
            }
        }

        return xy;
    };

    return objMovement;
}

function buildRightSimpleZigZagMovement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;
    objMovement.percent = 0;
    objMovement.segment = 0;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy;

        objMovement.percent += ((1 / 100) * objMovement.speed);

        if(objMovement.segment == 0)
        {
            xy = straightLine({x: 850, y: 0}, {x: 0, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 1)
        {
            xy = straightLine({x: 0, y: 0}, {x: 0, y:300}, objMovement.percent/100);
        }
        else if(objMovement.segment == 2)
        {
            xy = straightLine({x: 0, y: 300}, {x: 772, y:300}, objMovement.percent/100);
        }
        else if(objMovement.segment == 3)
        {
            xy = straightLine({x: 772, y: 300}, {x: 772, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 4)
        {
            xy = straightLine({x: 772, y: 0}, {x: 0, y:0}, objMovement.percent/100);
        }

        if(objMovement.percent == 100)
        {
            objMovement.percent = 0;

            if(objMovement.segment == 4)
            {
                objMovement.segment = 1;
            }
            else
            {
                objMovement.segment += 1;
            }
        }

        return xy;
    };

    return objMovement;
}

function buildLeftSwoopMovement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;
    objMovement.percent = 0;
    objMovement.segment = 0;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy;
        objMovement.percent += ((1 / 100) * speed);

        if(objMovement.segment == 0)
        {
            xy = swoop({x: -50, y: -100}, {x: 375, y: 700}, {x: 772, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 1)
        {
            xy = straightLine({x: 772, y: 0}, {x: 0, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 2)
        {
            xy = swoop({x: 0, y: 0}, {x: 375, y: 600}, {x: 772, y:0}, objMovement.percent/100);
        }

        if(objMovement.percent == 100)
        {
            objMovement.percent = 0;

            if(objMovement.segment == 2)
            {
                objMovement.segment = 1;
            }
            else
            {
                objMovement.segment += 1;
            }
        }

        return xy;
    };

    return objMovement;
}

function buildRightSwoopMovement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;
    objMovement.percent = 0;
    objMovement.segment = 0;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy;
        objMovement.percent += ((1 / 100) * speed);

        if(objMovement.segment == 0)
        {
            xy = swoop({x: 850, y: -100}, {x: 375, y: 700}, {x: 0, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 1)
        {
            xy = straightLine({x: 0, y: 0}, {x: 772, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 2)
        {
            xy = swoop({x: 772, y: 0}, {x: 375, y: 600}, {x: 0, y:0}, objMovement.percent/100);
        }

        if(objMovement.percent == 100)
        {
            objMovement.percent = 0;

            if(objMovement.segment == 2)
            {
                objMovement.segment = 1;
            }
            else
            {
                objMovement.segment += 1;
            }
        }

        return xy;
    };

    return objMovement;
}

function buildLeftBoxMovement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;
    objMovement.percent = 0;
    objMovement.segment = 0;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy;

        objMovement.percent += ((1 / 100) * objMovement.speed);

        if(objMovement.segment == 0)
        {
            xy = straightLine({x: 0, y: -50}, {x: 0, y:562}, objMovement.percent/100);
        }
        else if(objMovement.segment == 1)
        {
            xy = straightLine({x: 0, y: 562}, {x: 772, y:562}, objMovement.percent/100);
        }
        else if(objMovement.segment == 2)
        {
            xy = straightLine({x: 772, y:562}, {x: 772, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 3)
        {
            xy = straightLine({x: 772, y: 0}, {x: 0, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 4)
        {
            xy = straightLine({x: 0, y: 0}, {x: 0, y:562}, objMovement.percent/100);
        }

        if(objMovement.percent == 100)
        {
            objMovement.percent = 0;

            if(objMovement.segment == 4)
            {
                objMovement.segment = 1;
            }
            else
            {
                objMovement.segment += 1;
            }
        }

        return xy;
    };

    return objMovement;
}

function buildRightBoxMovement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;
    objMovement.percent = 0;
    objMovement.segment = 0;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy;

        objMovement.percent += ((1 / 100) * objMovement.speed);

        if(objMovement.segment == 0)
        {
            xy = straightLine({x: 772, y: -50}, {x: 772, y:562}, objMovement.percent/100);
        }
        else if(objMovement.segment == 1)
        {
            xy = straightLine({x: 772, y:562}, {x: 0, y:562}, objMovement.percent/100);
        }
        else if(objMovement.segment == 2)
        {
            xy = straightLine({x: 0, y:562}, {x: 0, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 3)
        {
            xy = straightLine({x: 0, y: 0}, {x: 772, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 4)
        {
            xy = straightLine({x: 772, y: 0}, {x: 772, y:562}, objMovement.percent/100);
        }

        if(objMovement.percent == 100)
        {
            objMovement.percent = 0;

            if(objMovement.segment == 4)
            {
                objMovement.segment = 1;
            }
            else
            {
                objMovement.segment += 1;
            }
        }

        return xy;
    };

    return objMovement;
}

function buildLeftXMovement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;
    objMovement.percent = 0;
    objMovement.segment = 0;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy;

        objMovement.percent += ((1 / 100) * objMovement.speed);

        if(objMovement.segment == 0)
        {
            xy = straightLine({x: -50, y: -50}, {x: 772, y:562}, objMovement.percent/100);
        }
        else if(objMovement.segment == 1)
        {
            xy = straightLine({x: 772, y:562}, {x: 0, y:562}, objMovement.percent/100);
        }
        else if(objMovement.segment == 2)
        {
            xy = straightLine({x: 0, y:562}, {x: 772, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 3)
        {
            xy = straightLine({x: 772, y:0}, {x: 0, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 4)
        {
            xy = straightLine({x: 0, y: 0}, {x: 772, y:562}, objMovement.percent/100);
        }

        if(objMovement.percent == 100)
        {
            objMovement.percent = 0;

            if(objMovement.segment == 4)
            {
                objMovement.segment = 1;
            }
            else
            {
                objMovement.segment += 1;
            }
        }

        return xy;
    };

    return objMovement;
}

function buildRightXMovement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;
    objMovement.percent = 0;
    objMovement.segment = 0;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy;

        objMovement.percent += ((1 / 100) * objMovement.speed);

        if(objMovement.segment == 0)
        {
            xy = straightLine({x: 850, y: -50}, {x: 0, y:562}, objMovement.percent/100);
        }
        else if(objMovement.segment == 1)
        {
            xy = straightLine({x: 0, y: 562}, {x: 772, y:562}, objMovement.percent/100);
        }
        else if(objMovement.segment == 2)
        {
            xy = straightLine({x: 772, y:562}, {x: 0, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 3)
        {
            xy = straightLine({x: 0, y: 0}, {x: 772, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 4)
        {
            xy = straightLine({x: 772, y: 0}, {x: 0, y:562}, objMovement.percent/100);
        }

        if(objMovement.percent == 100)
        {
            objMovement.percent = 0;

            if(objMovement.segment == 4)
            {
                objMovement.segment = 1;
            }
            else
            {
                objMovement.segment += 1;
            }
        }

        return xy;
    };

    return objMovement;
}

function buildLeftBackAndForthMovement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;
    objMovement.percent = 0;
    objMovement.segment = 0;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy;

        objMovement.percent += ((1 / 100) * objMovement.speed);

        if(objMovement.segment == 0)
        {
            objMovement.percent += ((1 / 100) * (objMovement.speed * 10));
            xy = straightLine({x: 0, y: -50}, {x: 0, y:40}, objMovement.percent/100);
        }
        else if(objMovement.segment == 1)
        {
            xy = straightLine({x: 0, y: 40}, {x: 772, y:40}, objMovement.percent/100);
        }
        else if(objMovement.segment == 2)
        {
            objMovement.percent += ((1 / 100) * (objMovement.speed * 10));
            xy = straightLine({x: 772, y:40}, {x: 772, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 3)
        {
            xy = straightLine({x: 772, y: 0}, {x: 0, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 4)
        {
            objMovement.percent += ((1 / 100) * (objMovement.speed * 10));
            xy = straightLine({x: 0, y: 0}, {x: 0, y:40}, objMovement.percent/100);
        }

        if(objMovement.percent >= 100)
        {
            objMovement.percent = 0;

            if(objMovement.segment == 4)
            {
                objMovement.segment = 1;
            }
            else
            {
                objMovement.segment += 1;
            }
        }

        return xy;
    };

    return objMovement;
}

function buildRightBackAndForthMovement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;
    objMovement.percent = 0;
    objMovement.segment = 0;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy;

        objMovement.percent += ((1 / 100) * objMovement.speed);

        if(objMovement.segment == 0)
        {
            objMovement.percent += ((1 / 100) * (objMovement.speed * 10));
            xy = straightLine({x: 772, y: -50}, {x: 772, y:40}, objMovement.percent/100);
        }
        else if(objMovement.segment == 1)
        {
            xy = straightLine({x: 772, y: 40}, {x: 0, y:40}, objMovement.percent/100);
        }
        else if(objMovement.segment == 2)
        {
            objMovement.percent += ((1 / 100) * (objMovement.speed * 10));
            xy = straightLine({x: 0, y:40}, {x: 0, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 3)
        {
            xy = straightLine({x: 0, y: 0}, {x: 772, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 4)
        {
            objMovement.percent += ((1 / 100) * (objMovement.speed * 10));
            xy = straightLine({x: 772, y: 0}, {x: 772, y:40}, objMovement.percent/100);
        }

        if(objMovement.percent >= 100)
        {
            objMovement.percent = 0;

            if(objMovement.segment == 4)
            {
                objMovement.segment = 1;
            }
            else
            {
                objMovement.segment += 1;
            }
        }

        return xy;
    };

    return objMovement;
}

function buildCenterBoxesMovement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;
    objMovement.percent = 0;
    objMovement.segment = 0;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy;

        objMovement.percent += ((1 / 100) * objMovement.speed);

        if(objMovement.segment == 0)
        {
            xy = straightLine({x: 386, y: -50}, {x: 386, y:562}, objMovement.percent/100);
        }
        else if(objMovement.segment == 1)
        {
            objMovement.percent += ((1 / 100) * objMovement.speed);
            xy = straightLine({x: 386, y: 562}, {x: 0, y:562}, objMovement.percent/100);
        }
        else if(objMovement.segment == 2)
        {
            xy = straightLine({x: 0, y:562}, {x: 0, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 3)
        {
            objMovement.percent += ((1 / 100) * objMovement.speed);
            xy = straightLine({x: 0, y: 0}, {x: 386, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 4)
        {
            xy = straightLine({x: 386, y: 0}, {x: 386, y:562}, objMovement.percent/100);
        }
        else if(objMovement.segment == 5)
        {
            objMovement.percent += ((1 / 100) * objMovement.speed);
            xy = straightLine({x: 386, y: 562}, {x: 772, y:562}, objMovement.percent/100);
        }
        else if(objMovement.segment == 6)
        {
            xy = straightLine({x: 772, y: 562}, {x: 772, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 7)
        {
            objMovement.percent += ((1 / 100) * objMovement.speed);
            xy = straightLine({x: 772, y: 0}, {x: 386, y:0}, objMovement.percent/100);
        }
        else if(objMovement.segment == 8)
        {
            xy = straightLine({x: 386, y: 0}, {x: 386, y:562}, objMovement.percent/100);
        }

        if(objMovement.percent == 100)
        {
            objMovement.percent = 0;

            if(objMovement.segment == 8)
            {
                objMovement.segment = 1;
            }
            else
            {
                objMovement.segment += 1;
            }
        }

        return xy;
    };

    return objMovement;
}

function buildTombstoneMovement(speed)
{
    var objMovement = {};

    objMovement.speed = speed;
    objMovement.initialMove = 0;

    objMovement.calculateMove = function(positionX, positionY)
    {
        var xy = {x: positionX, y: positionY};

        if(objMovement.initialMove == 0)
        {
            xy.y += 2000;

            objMovement.initialMove = 1;
        }
        else if(positionY < -2)
        {
            xy.y += objMovement.speed;
        }

        return xy;
    };

    return objMovement;
}