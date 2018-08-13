import sys, getopt
import json

if len(sys.argv) != 4:
    print len(sys.argv)
    print 'usage : \n\tactive_encoding.py <json data file> <encode rule file> <encoded new file name>'
    sys.exit(2)
else:
    # print sys.argv
    
    json_data = sys.argv[1]
    with open(json_data, 'r') as file:
        # json_data = file.readlines()
        # for i in json_data:
        #     if i[0] == '[':
        #         json_data = i
        #         break
        # jsonData = json.loads(''.join(json_data))
        jsonData = json.loads(file.readline())
    file.close()

    rule_file = sys.argv[2]
    with open(rule_file, 'r') as file:
        encode_rule = ''.join(file.readline()).split(',')
        # print encode_rule
        # npcs = encode_rule[::2]
        npcs = encode_rule
        # print npcs
        # code = encode_rule[1::2]
        # print code
    file.close()

    encoded_file = sys.argv[3]
    fp = open(encoded_file, 'w')
    fp.write('[')
    for data in jsonData:
        if data['target'] in npcs:
            fp.write('{"user_id":"' + data['user_id'] + '","game_scene":"' + data['game_scene'] + '","user_action":"' + data['user_action'] + '","target":"' + data['target'] + '"}')
            fp.write(',\n')
        # else:
        #     print data['target']
        #     print '\n'
    fp.seek(-2,2)
    fp.truncate()
    fp.write(']')
    fp.close()