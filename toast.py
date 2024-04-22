class colors:
    GREEN = '\033[1m\033[92m'
    YELLOW_BOLD = '\033[1m\033[93m'
    YELLOW = '\033[93m'
    RED = '\033[1m\033[91m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'
    END = '\033[0m'

def toast(message, type='info'):
    # Show a toast message
    if type == 'info':
        print('ℹ️ ' + colors.YELLOW_BOLD + ' info ' + colors.END + message)
    elif type == 'success':
        print('✅ ' + colors.GREEN + 'success ' + colors.END + message)
    elif type == 'error':
        print('🚫 ' + colors.RED + 'error ' + colors.END + message)