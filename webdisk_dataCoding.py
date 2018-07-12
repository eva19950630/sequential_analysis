# -*- coding: UTF-8 -*-
import json

# A: Simulator B: Quiz C: PPT D: Video
with open ('data/behavilog.json') as f:
    behavior_json = f.read()
    d = json.loads(behavior_json)
    # print(len(d))

    with open ('data/webdisk_dsBtnList.txt') as f2:
        # actionCount = sum(1 for _ in f2)
        # print actionCount
        line = f2.readlines()
        # print(line[0].rstrip('\n'))
        actionA = (line[0].split(','))
        actionB = (line[1].split(','))
        actionC = (line[2].split(','))
        actionD = (line[3].split(','))
        # print len(actionA),len(actionB),len(actionC),len(actionD)
        # print type(actionA)

    target = []
    user = []
    time = []
    for data in d:
        target.append(data['object_it'].encode('utf8'))
        user.append(data['actor'])
        time.append(data['datetime'])

    index = []
    indexCount = 0
    for item in target:
        if item in actionA:
            target[indexCount] = 'A'
            # print indexCount
            index.append(indexCount)
        elif item in actionB:
            target[indexCount] = 'B'
            # print indexCount
            index.append(indexCount)
        elif item in actionC:
            target[indexCount] = 'C'
            # print indexCount
            index.append(indexCount)
        elif item in actionD:
            target[indexCount] = 'D'
            # print indexCount
            index.append(indexCount)
        indexCount+=1
    
    data = []
    for i in index:
        if user[i] != "" and target[i] != "" and time[i] != "":
            data.append({  
                'account': user[i],
                'code': target[i],
                'time': time[i]
            })

    with open('webdisk_inputdata.json', 'w') as outfile:  
        json.dump(data, outfile, indent=4)
    