class ABC{
    void get(long a){
        System.out.println("long");
    }
    void get(double f){
        System.out.println("double");
    }

    public static void main(String[] args) {
        new ABC().get(10);
    }
}