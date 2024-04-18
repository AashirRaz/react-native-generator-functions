import subprocess
from toast import toast
from Constants import ToastConstants

def install_packages(packages: list[str], dev=False) -> bool:
    # Install required packages
    try:
        subprocess.run(['yarn', 'add', '--dev', *packages], check=True) if dev else subprocess.run(['yarn', 'add', *packages], check=True)
        toast(ToastConstants.Message.PACKAGES_INSTALLED, type=ToastConstants.Type.INFO)
        return True    
    except Exception as e:
        toast(ToastConstants.Message.PACKAGES_ERROR.format(e), type=ToastConstants.Type.ERROR)
        return False