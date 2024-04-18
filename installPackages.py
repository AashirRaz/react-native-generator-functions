import subprocess
from toast import toast

def install_packages(packages: list[str], dev=False):
    """Install required packages."""
    try:

        if dev:
            subprocess.run(['yarn', 'add', '--dev', *packages], check=True)
        else:
            subprocess.run(['yarn', 'add', *packages], check=True)

        toast(f"Packages installed successfully.", type='info')
        return True    
    except Exception as e:
        toast(f"Error occurred while installing packages: {e}", type='error')
        return False