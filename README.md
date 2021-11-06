# Monitoring Center
An Android and iOS Application for [Veyon](https://veyon.io)

⚠️ Please Note: This project is not to be considered stale. I do not have much time right now and I have decided to contribute to this project in Q3 2022.

## App Screenshots
|![SC03](https://github.com/candiedoperation/Monitoring-Center/blob/dedd05f04e3e8c977b62f3710d5e587c70ada75b/gh_assets/sc04.png)|![SC04](https://github.com/candiedoperation/Monitoring-Center/blob/9b5868157820825973c5158ad84d7cdffc559ab4/gh_assets/sc06.png)|
|---|---|
|![SC01](https://github.com/candiedoperation/Monitoring-Center/blob/d7bcdaa7ae1a179c3195301e5065df587fb27fca/gh_assets/sc01.png)|![SC02](https://github.com/candiedoperation/Monitoring-Center/blob/d7bcdaa7ae1a179c3195301e5065df587fb27fca/gh_assets/sc02.png)|
|||
|![SC05](https://github.com/candiedoperation/Monitoring-Center/blob/a88e8e22ba481745a8422259eca00af069b76568/gh_assets/sc05.png)|![SC06](https://github.com/candiedoperation/Monitoring-Center/blob/a88e8e22ba481745a8422259eca00af069b76568/gh_assets/sc07.png)|

## Is any Specific Version of Veyon Required ?
In short **Yes!** but, **No.**

### HTTP Headers are Case Insensitive.
Below are the W3C Guidelines for HTTP Headers

- https://www.w3.org/Protocols/rfc2616/rfc2616-sec4.html#sec4.2
- https://www.rfc-editor.org/rfc/rfc7230#appendix-A.2

For Further Reference visit https://stackoverflow.com/questions/5258977/are-http-headers-case-sensitive

HTTP Headers are Case Insensitive. Maximum HTTP Libraries in
JavaScript (XHR, Axios, fetch) convert HTTP Headers to Lowercase
and Veyon fails to authenticate the WebAPI Requests send by the
Android and iOS Application. More Information regarding this issue
can be found on
- https://github.com/veyon/veyon/issues/767
- https://github.com/veyon/veyon/issues/765#issuecomment-958891312
- https://github.com/veyon/veyon/pull/768
- https://github.com/veyon/veyon/pull/766
- https://github.com/veyon/veyon/commit/5d3e5a6d96304f13dc29294032e1004fe594b9e9

This issue in Veyon was discovered during development of an Android/iOS
Client for Veyon at https://github.com/candiedoperation/Monitoring-Center

### How can I use the App ?
There are two Options
- Wait for the Next Veyon Release (probably Veyon 4.99)
- Build Veyon From Source

#### Installing Dependencies for Building Veyon from Source
Requirements for Debian-based distributions:
- Build tools: g++ libc6-dev make cmake dpkg-dev
- Qt5: qtbase5-dev qtbase5-private-dev qtbase5-dev-tools qttools5-dev qttools5-dev-tools qtdeclarative5-dev qtquickcontrols2-5-dev
- X11: xorg-dev libxtst-dev libfakekey-dev
- libjpeg: libjpeg-dev provided by libjpeg-turbo8-dev or libjpeg62-turbo-dev
- zlib: zlib1g-dev
- OpenSSL: libssl-dev
- PAM: libpam0g-dev
- procps: libprocps-dev
- LZO: liblzo2-dev
- QCA: libqca-qt5-2-dev
- LDAP: libldap2-dev
- SASL: libsasl2-dev

As root you can run
```
sudo apt install g++ libc6-dev make cmake qtbase5-dev qtbase5-private-dev \
            qtbase5-dev-tools qttools5-dev qttools5-dev-tools \
            qtdeclarative5-dev qtquickcontrols2-5-dev libfakekey-dev \
            xorg-dev libxtst-dev libjpeg-dev zlib1g-dev libssl-dev libpam0g-dev \
            libprocps-dev liblzo2-dev libqca-qt5-2-dev libldap2-dev \
            libsasl2-dev
```

#### Building Veyon 4.6 From Source
The following is the way to build veyon 4.6 from source on Ubuntu 20.04 (There might be slight changes in commands in other OSes)
```
git clone --recursive https://github.com/veyon/veyon.git
cd veyon
git checkout 4.6
git submodule update --init

mkdir build
cd build
cmake -DCMAKE_INSTALL_PREFIX=/usr ..
fakeroot make package

sudo dpkg -i veyon-*****.deb
sudo apt install -f
```

#### Building Veyon 4.5 From Source
The following is the way to build veyon 4.5 from source on Ubuntu 20.04 (There might be slight changes in commands in other OSes)
```
git clone --recursive https://github.com/veyon/veyon.git
cd veyon
git checkout 4.5
git submodule update --init

mkdir build
cd build
cmake -DCMAKE_INSTALL_PREFIX=/usr ..
fakeroot make package

sudo dpkg -i veyon-*****.deb
sudo apt install -f
```

⚠️ Versions of Veyon prior to 4.5 do not have WebAPI support and hence are incompatible with this app