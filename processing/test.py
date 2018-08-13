import json

fp = open('test.json', 'w')
with open('user_behavior.json') as file:
    json_data = file.readlines()
    for i in json_data:
        if i[0] == '[':
            json_data = i
            break
    # print('finish load file...\n')  
    jsonData = json.loads(''.join(json_data))
    fp.write('[')
    for i, data in enumerate(jsonData):
        # print("writeing data...\n")
        scenes = data['game_scene'].split(',')
        actions = data['user_action'].split(',')
        targets = data['target'].split(',')
        for scene, action, target in zip(scenes, actions, targets):
            fp.write('{"user_id":"' + data['user_id'] + '","game_scene":"' + scene + '","user_action":"' + action + '","target":"' + target + '"}')
            fp.write(',')
            # fp.write('\n')
    fp.seek(-1,2)
    fp.truncate()
    fp.write(']')
    # print("finish writing datas.\n")
fp.close()