# table 15*15
import random
boomList=[8,18,28,38,48,58,68,78,88,98]
# def createBoom(count):
#   if count==0:
#     return
#   else:
#     rand = random.randint(0,10*10-1)
#     for x in boomList:
#       if x==rand or rand == 0 or rand==199:
#           return createBoom(count)
#   boomList.append(rand)
#   return createBoom(count-1)
# createBoom(20)
# print(boomList)
table=[]
pos={'x':0,'y':0}
# init_obj={
#   'position':{'x':0,'y':0},
#   'ignore':[],
#   'isboom':False
# }
def init_table():
  for i in  range(10):
    table.append([])
    for j in  range(10):
      table[i].append({
  'position':{'x':0,'y':0},
  'ignore':[],
  'isboom':False
})
c=0
def insertBoom():
  for i in range(10):
    for j in range(10):
        for k in range(len(boomList)):
          if 10*i+j == boomList[k]:
            # print(1)
            print(table[i][j]['isboom'])
            table[i][j]['isboom']=True
def isArea(table):
  if table[i][j]['x']>0 and table[i][j]['x']<10 and table[i][j]['y']>0 and table[i][j]['y']<10:
    return True
  else:
    return False
def judge(pos,table):
  if pos['x']==0 or (isArea(pos['x']-1,pos['y']) and table[pos['x']-1][pos['y']]['isboom']==True):
    pos[ignore].append('T')
  elif pos['y']==0 or (isArea(pos['x'],pos['y']-1) and table[pos['x']][pos['y']-1]['isboom']==True):
    pos[ignore].append('L')
  elif pos['x']==14 or (isArea(pos['x']+1,pos['y']) and table[pos['x']+1][pos['y']]['isboom']==True):
      pos[ignore].append('B')
  elif pos['y']==14 or (isArea(pos['x'],pos['y']+1) and table[pos['x']][pos['y']+1]['isboom']==True):
      pos[ignore].append('R')
def move(pos,table):
  if B not in table[pos['x']][pos['y']]
init_table()
insertBoom()
# print(c)
count=0
for i in range(10):
  for j in range(10):
    count=count+1
    print(table[i][j]['ignore'],end="")
    if count%10==0:
      print('')
count1=0
for i in  range(10):
  for j in range(10):
    count1=count1+1
    print(table[i][j]['isboom'],end="")
    if count1%10==0:
      print('')
# print(table)
    