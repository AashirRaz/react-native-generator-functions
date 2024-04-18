from toast import toast
from Constants import ToastConstants

def ReplaceFileContent(fileName:str, oldContent:list[str], newContent:list[str]) -> None:

    if(len(oldContent) != len(newContent)):
        toast(ToastConstants.Message.OLDCONTENT_NOT_EQUALS_NEWCONTENT, type=ToastConstants.Type.ERROR)
        return
    
    with open(fileName, 'r') as file:
        data = file.read()

    for i in range(0, oldContent.__len__()):  
        data = data.replace(oldContent[i], newContent[i])
    
    with open(fileName, 'w') as file:
        file.write(data)
