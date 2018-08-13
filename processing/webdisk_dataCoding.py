# -*- coding: UTF-8 -*-
import json

def changeToSchoolYear(date):
    if (date.find('-') != -1):
        dateArr = date.split('-')
    elif (date.find('/') != -1):
        dateArr = date.split('/')
    # print(dateArr[1]);
    if (int(dateArr[1]) >= 8):
        return int(dateArr[0])-1911;
    else:
        return int(dateArr[0])-1912;

# A: Simulator B: Quiz C: PPT D: Video
with open ('../data/behavilog.json') as f:
    behavior_json = f.read()
    d = json.loads(behavior_json)
    # print(len(d))

    with open ('../data/webdisk_dsBtnList.txt') as f2:
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
    mode = []
    for data in d:
        target.append(data['object_it'].encode('utf8'))
        user.append(data['actor'])
        time.append(str(changeToSchoolYear(data['datetime'].split(' ')[0])))
        mode.append(data['Mode'])

    # Learning Approach
    index = []
    for i,item in enumerate(target):
        if item in actionA:
            target[i] = 'A'
            index.append(i)
        elif item in actionB:
            target[i] = 'B'
            index.append(i)
        elif item in actionC:
            target[i] = 'C'
            index.append(i)
        elif item in actionD:
            target[i] = 'D'
            index.append(i)

    data = []
    for i in index:
        if user[i] != "" and target[i] != "" and time[i] != "":
            data.append({  
                'account': user[i],
                'code': target[i],
                'schoolYear': time[i]
            })

    with open('../webdisk_LA.json', 'w') as outfile:  
        json.dump(data, outfile, indent=4)

    # Simulator
    index2 = []
    for i,item in enumerate(mode):
        if item == 'step':
            mode[i] = 'A'
            index2.append(i)
        elif item == 'animation':
            mode[i] = 'B'
            index2.append(i)
        elif item == 'Animation':
            mode[i] = 'B'
            index2.append(i)
        elif item == 'run-all':
            mode[i] = 'C'
            index2.append(i)

    data2 = []
    for i in index2:
        if user[i] != "" and mode[i] != "" and time[i] != "":
            data2.append({  
                'account': user[i],
                'modeCode': mode[i],
                'schoolYear': time[i]
            })

    with open('../webdisk_SIMU.json', 'w') as outfile:  
        json.dump(data2, outfile, indent=4)

    