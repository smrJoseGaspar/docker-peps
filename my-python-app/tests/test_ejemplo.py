"""Fichero de prubas de ejemplo"""
# This is a placeholder for correct code for this message.

def zero():
    """Devuelve siempre cero"""
    return 0


def uno():
    """Devuelve siempre uno"""
    return 1


def saludar():
    """Devuelve un saludo: Hola mundo"""
    return "Hola mundo"

# Test
def test_zero() :
    """Test 0"""
    assert zero() == 0

def test_uno() :
    """Test 1"""
    assert uno() == 1

def test_saludar():
    """Test Saludar"""
    assert saludar() == "Hola mundo"
