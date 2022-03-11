# -*- coding: utf-8 -*-
#!/usr/bin/python3
# only python3, python2 will die

import random


def test_quit(str_to_test):
    return str_to_test in ['q', 'quit']


def test_help(str_to_test):
    return str_to_test in ['h', 'help']


def multiplication_test(lim_inf, lim_sup, help_function):
    num_1 = random.randint(lim_inf, lim_sup)
    num_2 = random.randint(lim_inf, lim_sup)
      
    answer_false = True
    local_quit = False

    while answer_false and not local_quit:
        user_answer = input("%d*%d: " % (num_1, num_2))
        local_quit = test_quit(user_answer)
        local_help = test_help(user_answer)
        if not local_help and not local_quit:
            try:
                answer_false = int(user_answer) != num_1*num_2
            except:
                print("invalid answer")
        if local_help:
            help_function()


def ten_to_hundred_multiplication():
    print("%s" % ('## ten to hundred multiplication'))
    multiplication_test(10, 100, ten_to_one_hundred_help)


def ten_to_one_hundred_help():
    print("### ten_to_one_hundred_help")
    print("A = 10*Da + 1*Ua")
    print("B = 10*Db + 1*Ub")
    print("R1 = Da*Db ||| R2 = Ua*Ub")
    print("R3 = Ua*Db + Ub*Da")
    print("R = 100*R1 + 10*R3 + 1*R2")


def ten_to_twenty_multiplication():
    print("%s" % ('## ten to twenty multiplication'))
    multiplication_test(10, 20, ten_to_twenty_help)


def ten_to_twenty_help():
    print("### ten_to_twenty_help")
    print("A > B")
    print("R1 = (A + B%10)*10")
    print("R2 = A%10 * B%10")
    print("R = R1 + R2")


def ten_to_twenty_squarre():
    print("## ten_to_twenty_squarre")
    numbers = list(range(11, 20))
    random.shuffle(numbers)
    for i_squarre in numbers:
        multiplication_test(i_squarre, i_squarre, ten_to_twenty_help)


def squarre_root(lim_inf, lim_sup, help_function):
  
    number = random.randint(lim_inf, lim_sup)
  
    answer_false = True
    local_quit = False

    while answer_false and not local_quit:
        user_answer = input("%d^(1/2): " % (number*number))
  
        local_quit = test_quit(user_answer)
        local_help = test_help(user_answer)
  
        if not local_help and not local_quit:
            try:
                answer_false = int(user_answer) != number
            except:
                print("invalid answer")
        if local_help:
            help_function()


def four_number_squarre_root():
    print('## four_number_squarre_root')
    squarre_root(21, 99, four_number_squarre_root_help)


def before_40000_squarre_root_help(number_of_number = 4):
    print("Y = 100*Cy + Uy")
    if number_of_number == 4:
        uy_max = 100
    if number_of_number == 5:
        uy_max = 1000
    print("Uy < %d" %(uy_max))
    print("Y = X*X")
    print("X = 10*Dx + Ux")
    print("Ux, Dx < 10")
    print("Ux: compare Uy with squarre of 1 to 9, you have one or two result to Ux")
    print("Dx: get the squarre immediatly inferior to Cy you will have Dx")
    print("fix Ux: compare Dx*Dx with Cy")
    print("if Dx*Dx+Dx < Cy => get bigger Ux")
    print("if Dx*Dx+Dx > Cy => get smaller Ux")


def four_number_squarre_root_help():
    print("### four_number_squarre_root_help")
    print("you need to know squarre 1 to 10")
    before_40000_squarre_root_help(4)


def five_number_squarre_root_before_40000():
    print('## five_number_squarre_root_before_40000')
    squarre_root(101, 199, five_number_squarre_root_before_40000_help)


def five_number_squarre_root_before_40000_help():
    print('### five_number_squarre_root_before_40000_help')
    print("you need to know squarre 11 to 20")
    before_40000_squarre_root_help(5)


def five_six_number_squarre_root_after_40000():
    print('## five_six_number_squarre_root_after_40000')
    squarre_root(201, 1000, five_six_number_squarre_root_after_40000_help)


def five_six_number_squarre_root_after_40000_help():
    print('### five_six_number_squarre_root_after_40000_help')
    print('Y = 10 000*DKy + 100*Cy + Uy with DKy, Cy, Uy < 100')
    print('Y = X*X')
    print("X = 100*Cx + 10*Dx + Ux, with Cx, Dx, Ux < 10")
    print("Ux: compare Uy with squarre of 1 to 9, you have one or two result to Ux")
    print("Cx: get the squarre immediatly inferior to Dky you will have Cx")
    print("T1 = DKy - Cx*Cx")
    print("Cy = 10*Dcy + Ucy with Dcy < 10, Ucy < 10")
    print("Dd = 10*T1 + Dcy")
    print("Ds = 2*Cx+1")
    print("Dd = q*Ds + R1 => par defaut")
    print("Dd = (q+1)*Ds + R2 => par exces, R2 <= 0")
    print("Dx = q")
    print("if |R1| < |R2| => get bigger Ux")
    print("if |R1| > |R2| => get smaller Ux")


ten_to_twenty_multiplication()
ten_to_hundred_multiplication()
ten_to_twenty_squarre()
four_number_squarre_root()
five_number_squarre_root_before_40000()
five_six_number_squarre_root_after_40000()
