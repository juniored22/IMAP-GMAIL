#!/usr/bin/env python
# coding: utf-8
import os
import email
import imaplib
import ctypes
import getpass

#config gmail
#action congig > POP IMAP  imap
#https://myaccount.google.com/lesssecureapps

mail = imaplib.IMAP4_SSL('imap.gmail.com',993)
unm = raw_input("insert Email : ")
pwd = getpass.getpass("input : ")
mail.login(unm,pwd)

#Rotulo da caixa de entrada
mail.select("INBOX")

def loop():
   mail.select("INBOX")
   n=0
   (retcode, messages) = mail.search(None, '(UNSEEN)') #ler nao lida
   #(retcode, messages) = mail.search(None, 'ALL') #ler tudo sem marca nao lida
   if retcode == 'OK':

      for num in messages[0].split() :
         #print 'Processing '
         n=n+1

         #numero do processo
         print n

         typ, data = mail.fetch(num,'(RFC822)')

         for response_part in data:
            if isinstance(response_part, tuple):
                original = email.message_from_string(response_part[1])
                para = original['From']
                data = original['Subject']
                #print data
                texto = data
                os.system('notify-send -i "/usr/share/g.png" "{}" "{}"' .format(para,texto))
                if data == 'eject':
                   ctypes.windll.WINMM.mciSendStringW(u"set cdaudio door open", None, 0, None)
                typ, data = mail.store(num,'+FLAGS','\\Seen')

   if n != 0:
       print ("mensagem nº {}" .format(n))
       #os.system('notify-send "{}"' .format(n))

if __name__ == '__main__':
      try:
        ##print 'Press Ctrl-C to quit.'
        while True:
            loop()
      finally:
         print"thank"
