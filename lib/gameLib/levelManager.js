var objLevel = {};
var objLevelLibrary = {};

function buildLevel()
{
    var objLevel = {};

    objInterface.setInputSleeping(2000);

    objLevel.blnInvulnerable = false;
    objLevel.blnGameOver = false;
    objLevel.fadeOut = false;
    objLevel.blnDisplayTitle = true;

    objLevel.objFloorsTemplate = {};
    objLevel.objFloors = {};
    objLevel.objBullets = {};
    objLevel.objEntities = {};
    objLevel.objDeaths = {};
    objLevel.objPitfalls = {};
    objLevel.objTombstones = {};
    objLevel.objWaves = {};
    objLevel.intFloorCounter = 0;
    objLevel.intBulletCounter = 0;
    objLevel.intDeathCounter = 0;
    objLevel.intEntityCounter = 0;
    objLevel.earnings = 0;
    objLevel.multiplier = 0;

    objLevel.objPause = buildPause();
    objLevel.objFade = buildFade();
    objLevel.objHUD = buildHUD();
    objLevel.objTitle = buildLevelTitle();
    objLevel.objMusic = objMusic[objLevelLibrary['level' + objPlayer.nextLevel].levelMusic];
    objLevel.strTitle = objLevelLibrary['level' + objPlayer.nextLevel].levelName;

    objPlayer.batteryPower = 0;

    $.each(objLevelLibrary['level' + objPlayer.nextLevel].levelEntities, function()
    {
        if(this.entityName == 'player')
        {
            objLevel.player = buildPlayerEntity();
        }
        else if(this.entityName == 'floor')
        {
            objLevel.objFloors['floor' + objLevel.intFloorCounter] = buildEntity(this.entityName, this.movement, this.timing, this.type);
            objLevel.intFloorCounter += 1;
            objLevel.objFloors['floor0'].updateHP(1000);
            objLevel.objFloorsTemplate = this;
        }
        else if(this.entityName == 'pitfall')
        {
            objLevel.objPitfalls['entity' + objLevel.intEntityCounter] = buildEntity(this.entityName, this.movement, this.timing, this.type, this.waveNumber);
        }
        else
        {
            objLevel.objEntities['entity' + objLevel.intEntityCounter] = buildEntity(this.entityName, this.movement, this.timing, this.type, this.waveNumber);

            if(this.entityName == 'tombstoneBug')
            {
                objLevel.objTombstones['entity' + objLevel.intEntityCounter] = objLevel.objEntities['entity' + objLevel.intEntityCounter];

                if(typeof objLevel.objWaves[this.waveNumber] == 'undefined')
                {
                    objLevel.objWaves[this.waveNumber] = {};
                    objLevel.objWaves[this.waveNumber].entityCount = 0;
                    objLevel.objWaves[this.waveNumber].alreadyUsed = false;
                    objLevel.objWaves[this.waveNumber].entities = {};
                }

                objLevel.objWaves[this.waveNumber].entityCount += 1;
                objLevel.objWaves[this.waveNumber].entities['entity' + objLevel.intEntityCounter] = objLevel.objEntities['entity' + objLevel.intEntityCounter];
            }
            else
            {
                if(typeof objLevel.objWaves[this.waveNumber] == 'undefined')
                {
                    objLevel.objWaves[this.waveNumber] = {};
                    objLevel.objWaves[this.waveNumber].entityCount = 0;
                    objLevel.objWaves[this.waveNumber].alreadyUsed = false;
                    objLevel.objWaves[this.waveNumber].entities = {};
                }

                objLevel.objWaves[this.waveNumber].entityCount += 1;
                objLevel.objWaves[this.waveNumber].entities['entity' + objLevel.intEntityCounter] = objLevel.objEntities['entity' + objLevel.intEntityCounter];
            }

            objLevel.intEntityCounter += 1;
        }
    });

    objLevel.objMusic.playMusic();

    return objLevel;
}

function renderLevel()
{
    if(objGame.gamePaused == false)
    {
        for(var key in objLevel.objFloors)
        {
            objLevel.objFloors[key].movement();
            objLevel.objFloors[key].renderSprite();

            var floorHP = objLevel.objFloors[key].updateHP(1);

            if(floorHP == 3235)
            {
                objLevel.objFloors['floor' + objLevel.intFloorCounter] = buildEntity(objLevel.objFloorsTemplate.entityName, objLevel.objFloorsTemplate.movement, objLevel.objFloorsTemplate.timing, 'floorLoop');
                objLevel.intFloorCounter += 1;
            }
            else if(floorHP == 0)
            {
                delete objLevel.objFloors[key];
            }
        }

        // Pitfalls get their own loop because they need to be rendered below the bugs and other entities.
        for(var key in objLevel.objPitfalls)
        {
            if(objLevel.objPitfalls[key].timing <= 0)
            {
                objLevel.objPitfalls[key].movement();
                objLevel.objPitfalls[key].renderSprite();
            }
        }

        for(var key in objLevel.objDeaths)
        {
            objLevel.objDeaths[key].movement();
            objLevel.objDeaths[key].renderSprite();
        }

        objLevel.player.renderSprite();

        for(var key in objLevel.objEntities)
        {
            if(objLevel.objEntities[key].assetName == 'rightTombstoneAttack' || objLevel.objEntities[key].assetName == 'leftTombstoneAttack' || objLevel.objEntities[key].assetName == 'centerTombstoneAttack')
            {
                if(objLevel.objEntities[key].objSprite.stage == 0)
                {
                    objLevel.objEntities[key].objSprite.height = 1;
                    objLevel.objEntities[key].objSprite.stage += 1;
                }
                else if(objLevel.objEntities[key].objSprite.stage >= 1 && objLevel.objEntities[key].objSprite.stage < 4 && objLevel.objEntities[key].objSprite.stageCounter < 1)
                {
                    objLevel.objEntities[key].objSprite.stageCounter += 1;
                }
                else if(objLevel.objEntities[key].objSprite.stage >= 1 && objLevel.objEntities[key].objSprite.stage < 4 && objLevel.objEntities[key].objSprite.stageCounter >= 1)
                {
                    objLevel.objEntities[key].objSprite.height = objLevel.objEntities[key].objSprite.originalHeight * (objLevel.objEntities[key].objSprite.stage /3);
                    objLevel.objEntities[key].objSprite.stage += 1;
                    objLevel.objEntities[key].objSprite.stageCounter = 0;
                }
                else if(objLevel.objEntities[key].objSprite.stage == 4 && objLevel.objEntities[key].objSprite.stageCounter < 40)
                {
                    objLevel.objEntities[key].objSprite.stageCounter += 1;
                }
                else if(objLevel.objEntities[key].objSprite.stage == 4 && objLevel.objEntities[key].objSprite.stageCounter >= 40)
                {
                    objLevel.objEntities[key].objSprite.stage += 1;
                }
                else if(objLevel.objEntities[key].objSprite.stage == 5 && objLevel.objEntities[key].objSprite.stageCounter < 300)
                {
                    objLevel.objEntities[key].objSprite.stageCounter += 1;
                    objLevel.objEntities[key].positionY -= 5;
                }
                else if(objLevel.objEntities[key].objSprite.stage >= 5 && objLevel.objEntities[key].objSprite.stageCounter >= 300)
                {
                    objLevel.objEntities[key].updateHP(5000);
                }
            }

            if(objLevel.objEntities[key].assetName != 'pitfall' && objLevel.objEntities[key].assetName != 'tombstoneBug' && objLevel.objEntities[key].timing <= 0)
            {
                objLevel.objEntities[key].movement();
                objLevel.objEntities[key].renderSprite();
            }
        }

        for(var key in objLevel.objBullets)
        {
            objLevel.objBullets[key].movement();
            objLevel.objBullets[key].renderSprite();
        }

        // Tombstones get their own loop because they need to be rendered above the bugs and other entities.
        for(var key in objLevel.objTombstones)
        {
            if(objLevel.objTombstones[key].timing <= 0)
            {
                objLevel.objTombstones[key].movement();
                objLevel.objTombstones[key].renderSprite();
            }
        }

        if(typeof objLevel.laptop !== 'undefined')
        {
            objLevel.laptop.movement();
            objLevel.laptop.renderSprite();
        }

        if(typeof objLevel.explosion !== 'undefined')
        {
            objLevel.explosion.movement();
            objLevel.explosion.renderSprite();
        }

        objLevel.objHUD.render();

        if(objLevel.fadeOut)
        {
            objLevel.objFade.render();
        }

        if(objLevel.blnDisplayTitle)
        {
            objLevel.objTitle.render();
        }
    }
    else
    {
        objLevel.objPause.render();
    }
}

function calculateCollisions()
{
    // Loop through all entities and check if they collide with bullets, explosions or the player
    for(var key in objLevel.objEntities)
    {
        if(objLevel.objEntities[key].timing <= 0)
        {
            var blnDelete = false;

            if(objLevel.objEntities[key].assetName == 'entityBullet' || objLevel.objEntities[key].assetName == 'leftTombstoneAttack' || objLevel.objEntities[key].assetName == 'rightTombstoneAttack' || objLevel.objEntities[key].assetName == 'centerTombstoneAttack')
            {
                if(objLevel.objEntities[key].updateHP(1) <= 0)
                {
                    blnDelete = true;
                }
            }

            // Checking the things that can kill entities
            for(var key2 in objLevel.objBullets)
            {
                if(objLevel.objEntities[key].type == 'monster' && checkCollision(objLevel.objBullets[key2], objLevel.objEntities[key]) && !objLevel.objBullets[key2].contacts.includes(key))
                {
                    if(objLevel.objBullets[key2].assetName != 'bulletBig')
                    {
                        delete objLevel.objBullets[key2];
                    }
                    else
                    {
                        objLevel.objBullets[key2].contacts.push(key);
                    }

                    objSounds.tombstoneHit.play();

                    if(objLevel.objEntities[key].updateHP(objPlayer.IDE[objPlayer.IDE.active].damage) <= 0)
                    {
                        objPositions.setPosition('entity',objLevel.objEntities[key].getPos());

                        objLevel.objDeaths['death' + objLevel.intDeathCounter] = buildEntity(objLevel.objEntities[key].assetName + 'Death', 'stationary', 0, 'death');
                        objLevel.objWaves[objLevel.objEntities[key].waveNumber].entityCount -= 1;
                        objLevel.intDeathCounter += 1;
                        objLevel.earnings += objLevel.objEntities[key].bounty;

                        if(objLevel.objEntities[key].assetName == 'tombstoneBug')
                        {
                            objSounds.tombstoneDeath.play();
                        }
                        else
                        {
                            objSounds.bugDeath.play();
                        }

                        blnDelete = true;
                        break;
                    }

                    if(objLevel.objEntities[key].assetName == 'tombstoneBug')
                    {
                        objCanvas.context.globalAlpha = 0.15;
                        objCanvas.context.beginPath();
                        objCanvas.context.arc(400,-430 + objLevel.objEntities[key].positionY,500,0,2 * Math.PI, false);
                        objCanvas.context.fillStyle = '#FFFFFF';
                        objCanvas.context.fill();
                        objCanvas.context.globalAlpha = 1;
                    }
                }
                else if(objLevel.objEntities[key].assetName == 'entityBullet' && checkCollision(objLevel.objBullets[key2], objLevel.objEntities[key]))
                {
                    blnDelete = true;

                    if(objLevel.objBullets[key2].assetName != 'bulletBig')
                    {
                        delete objLevel.objBullets[key2];
                    }
                }
            }


            if(typeof objLevel.explosion !== 'undefined' && objLevel.objEntities[key].type == 'monster' && checkCollision(objLevel.explosion, objLevel.objEntities[key]))
            {
                if(objLevel.explosion.hitEntities.indexOf(key) < 0)
                {
                    objLevel.explosion.hitEntities.push(key);

                    if(objLevel.objEntities[key].updateHP(objPlayer.explosionDamage) <= 0)
                    {
                        objPositions.setPosition('entity',objLevel.objEntities[key].getPos());
                        objLevel.objDeaths['death' + objLevel.intDeathCounter] = buildEntity(objLevel.objEntities[key].assetName + 'Death', 'stationary', 0, 'death');
                        objLevel.objWaves[objLevel.objEntities[key].waveNumber].entityCount -= 1;
                        objLevel.intDeathCounter += 1;
                        objLevel.earnings += objLevel.objEntities[key].bounty;
                        blnDelete = true;
                    }
                }
            }
            else if(typeof objLevel.explosion !== 'undefined' && objLevel.objEntities[key].assetName == 'entityBullet' && checkCollision(objLevel.explosion, objLevel.objEntities[key]))
            {
                blnDelete = true;
            }

            // If the player was hit, lose PTO unless he is marked as invulnerable
            if(checkCollision(objLevel.objEntities[key],objLevel.player) && objLevel.blnInvulnerable == false)
            {
                objLevel.objDeaths['death' + objLevel.intDeathCounter] = buildEntity('playerSleeping', 'playerSleeping', 0, 'playerSleeping');
                objLevel.intDeathCounter += 1;
                objSounds.hit.play();
                objPlayer.ptoLost();
            }

            if(blnDelete)
            {
                if(objLevel.objEntities[key].assetName == 'tombstoneBug')
                {
                    delete objLevel.objTombstones[key];
                }

                delete objLevel.objEntities[key];
            }
        }
    }

    for(var key in objLevel.objPitfalls)
    {
        if(checkCollision(objLevel.objPitfalls[key],objLevel.player) && objLevel.blnInvulnerable == false)
        {
            objSounds.falling.play();
            objPlayer.ptoLost();
        }
    }
}

function levelTick()
{
    // Check if the laptop is out of HP and if it is, explode
    if(typeof objLevel.laptop !== 'undefined' && objLevel.laptop.updateHP(1) <= 0)
    {
        objPositions.setPosition('laptop', objLevel.laptop.getPos());
        objLevel.explosion = buildEntity('explosion', 'stationary', 0, 'temp');
        objLevel.laptop = undefined;
        objSounds.explosion.play();
    }

    // Check if the explosion has expired and delete it if it has
    if(typeof objLevel.explosion !== 'undefined' && objLevel.explosion.updateHP(1) <= 0)
    {
        objLevel.explosion = undefined;
    }

    for(var key in objLevel.objPitfalls)
    {
        if(objLevel.objPitfalls[key].updateHP(1) <= 0)
        {
            delete objLevel.objPitfalls[key];
        }
    }

    // Update bullet HP to check if they are dead
    for(var key in objLevel.objBullets)
    {
        if(objLevel.objBullets[key].updateHP(1) <= 0)
        {
            delete objLevel.objBullets[key];
        }
    }

    // Update death HP to check if they are dead
    for(var key in objLevel.objDeaths)
    {
        if(objLevel.objDeaths[key].updateHP(1) <= 0)
        {
            delete objLevel.objDeaths[key];
        }
    }

    objPlayer.cooldown();

    //Check to see if the current wave of bugs is dead and if it is trigger the next to go very soon.
    for(var key in objLevel.objWaves)
    {
        if(objLevel.objWaves[key].entityCount <= 0 && !objLevel.objWaves[key].alreadyUsed)
        {
            var firstEntityTiming = 0;
            objLevel.objWaves[key].alreadyUsed = true;

            for(var key2 in objLevel.objWaves)
            {
                if(key2 > key && firstEntityTiming == 0)
                {
                    for(var key3 in objLevel.objWaves[key2].entities)
                    {
                        if(objLevel.objWaves[key2].entities[key3].timing > 100)
                        {
                            firstEntityTiming = objLevel.objWaves[key2].entities[key3].timing - (10 * Object.keys(objLevel.objWaves['4'].entities).length);
                        }
                        else
                        {
                            firstEntityTiming = 1;
                        }

                        break;
                    }
                }

                if(key2 > key)
                {
                    for(var key3 in objLevel.objWaves[key2].entities)
                    {
                        objLevel.objWaves[key2].entities[key3].timing -= firstEntityTiming;
                    }
                }
            }
        }
    }

    // If all entities are dead. Victory!
    if(Object.keys(objLevel.objEntities).length <= 0)
    {
        objLevel.fadeOut = true;
    }
    else
    {
        objLevel.multiplier += 1;
    }

    // Push pitfall timing forward.
    for(var key in objLevel.objPitfalls)
    {
        if(objLevel.objPitfalls[key].timing > 0)
        {
            objLevel.objPitfalls[key].timing -= 1;
        }
    }

    // Push entity timing forward or fire if ranged.
    for(var key in objLevel.objEntities)
    {
        if(objLevel.objEntities[key].timing > 0)
        {
            objLevel.objEntities[key].timing -= 1;

            if(objLevel.objEntities[key].timing == 0 && objLevel.objEntities[key].waveNumber > 1)
            {
                objLevel.objWaves[objLevel.objEntities[key].waveNumber - 1].alreadyUsed = true;
            }
        }
        else
        {
            objLevel.objEntities[key].monsterFire();
        }
    }

    if(objLevel.objFade.fadeCounter == 100)
    {
        objGame.setGameState('buildMenu');
        objLevel.objMusic.stop();

        if(objLevel.blnGameOver == true)
        {
            objGame.setMenuState('gameover');
            submitScore();
        }
        else
        {
            submitLevelStats();
            objGame.setMenuState('victory');
        }
    }
}

function buildHUD()
{
    var objHUD = {};

    objHUD.ptoIcon = objUILibrary.ptoIcon.objImage;
    objHUD.batteryPower = objUILibrary.batteryPower.objImage;
    objHUD.batteryColor = 'red';
    objHUD.batteryColorCounter = 0;

    objHUD.render = function()
    {
        objCanvas.context.globalAlpha = 0.3;
        objCanvas.context.fillStyle = "#000000";
        objCanvas.context.fillRect(0, 557, 50, 575);
        objCanvas.context.globalAlpha = 1;

        objCanvas.context.globalAlpha = 0.3;
        objCanvas.context.fillStyle = "#000000";
        objCanvas.context.fillRect(0, 576, 160, 600);
        objCanvas.context.globalAlpha = 1;

        objCanvas.context.drawImage
        (
            objHUD.ptoIcon,
            0,
            0,
            14,
            15,
            3,
            562,
            14,
            15
        );

        objCanvas.context.fillStyle = "#FFFFFF";
        objCanvas.context.font = '12px Arial';
        objCanvas.context.textAlign = 'left';
        objCanvas.context.fillText('x ' + objPlayer.pto, 25, 574);

        objCanvas.context.drawImage
        (
            objHUD.batteryPower,
            0,
            16 * objPlayer.batteryPower,
            150,
            16,
            3,
            581,
            150,
            16
        );

        if(objPlayer.batteryPower == objPlayer.batteryMax)
        {
            objHUD.batteryColorCounter += 1;

            if(objHUD.batteryColor == 'red' && objHUD.batteryColorCounter == 20)
            {
                objHUD.batteryColor = 'white';
                objHUD.batteryColorCounter = 0;
            }
            else if(objHUD.batteryColor == 'white' && objHUD.batteryColorCounter == 20)
            {
                objHUD.batteryColor = 'red';
                objHUD.batteryColorCounter = 0;
            }


            objCanvas.context.fillStyle = objHUD.batteryColor;
            objCanvas.context.font = '10px Arial';
            objCanvas.context.textAlign = 'left';
            objCanvas.context.fillText('LAPTOP OVERHEATING', 19, 593);
        }
    };

    return objHUD;
}

function buildPause()
{
    var objPause = {};

    objPause.render = function()
    {
        objCanvas.context.fillStyle = "#000000";
        objCanvas.context.fillRect(0, 0, objInterface.aspectWidth, objInterface.aspectHeight);

        objCanvas.context.font = '50px Arial';
        objCanvas.context.textAlign = 'center';
        objCanvas.context.fillStyle = colInactive;
        objCanvas.context.fillText('Paused', 400, 275);
    };

    return objPause;
}

function buildFade()
{
    var objFade = {};

    objFade.fadeCounter = 0;

    objFade.render = function()
    {
        objCanvas.context.globalAlpha = 0.01 * objFade.fadeCounter;
        objCanvas.context.fillStyle = "#000000";
        objCanvas.context.fillRect(0, 0, objInterface.aspectWidth, objInterface.aspectHeight);
        objCanvas.context.globalAlpha = 1;

        objFade.fadeCounter += 1;
    };

    return objFade;
}

function buildLevelTitle()
{
    var objLevelTitle = {};

    objLevelTitle.slide = 0;
    objLevelTitle.slideCounter = 0;
    objLevelTitle.backgroundAlpha = 1;
    objLevelTitle.textAlpha = 0;

    objLevelTitle.render = function()
    {
        if(objLevelTitle.slide < 3)
        {
            objLevelTitle.slideCounter += 1;

            if(objLevelTitle.slideCounter == 50)
            {
                objLevelTitle.slide += 1;
                objLevelTitle.slideCounter = 0;
            }
        }
        else
        {
            objLevel.blnDisplayTitle = false;
        }

        if(objLevelTitle.slide == 0)
        {
            objLevelTitle.textAlpha += 0.02;
        }
        else if(objLevelTitle.slide == 2)
        {
            objLevelTitle.backgroundAlpha -= 0.02;
            objLevelTitle.textAlpha -= 0.02;
        }

        objCanvas.context.globalAlpha = objLevelTitle.backgroundAlpha.toFixed(2);
        objCanvas.context.fillStyle = "#000000";
        objCanvas.context.fillRect(0, 0, objInterface.aspectWidth, objInterface.aspectHeight);


        objCanvas.context.textAlign = 'center';
        objCanvas.context.fillStyle = colInactive;
        objCanvas.context.globalAlpha = objLevelTitle.textAlpha.toFixed(2);
        objCanvas.context.font = '16px Arial';
        if(objPlayer.nextLevel == 98)
        {
            objCanvas.context.fillText('Demo Level' , 400, 235);
        }
        else if(objPlayer.nextLevel == 99)
        {
            objCanvas.context.fillText('Demo Level of Doom', 400, 235);
        }
        else
        {
            objCanvas.context.fillText('Level ' + objPlayer.nextLevel.toString(), 400, 235);
        }
        objCanvas.context.font = '32px Arial';
        objCanvas.context.fillText(objLevel.strTitle, 400, 275);
        objCanvas.context.globalAlpha = 1;
    };

    return objLevelTitle;
}