PGDMP     0    8                {            getsamuraisdb    15.3 #   15.4 (Ubuntu 15.4-0ubuntu0.23.04.1)      [           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            \           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ]           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ^           1262    16389    getsamuraisdb    DATABASE     x   CREATE DATABASE getsamuraisdb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF8';
    DROP DATABASE getsamuraisdb;
                lucas    false            _           0    0    getsamuraisdb    DATABASE PROPERTIES     6   ALTER DATABASE getsamuraisdb SET "TimeZone" TO 'utc';
                     lucas    false                        2615    2200    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                lucas    false            �            1259    16406    services    TABLE     %  CREATE TABLE public.services (
    id integer NOT NULL,
    "mainPhoto" text NOT NULL,
    title text NOT NULL,
    description character varying(400) NOT NULL,
    phone bigint NOT NULL,
    price integer NOT NULL,
    user_id integer NOT NULL,
    available boolean DEFAULT true NOT NULL
);
    DROP TABLE public.services;
       public         heap    lucas    false    5            �            1259    16405    services_id_seq    SEQUENCE     �   CREATE SEQUENCE public.services_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.services_id_seq;
       public          lucas    false    217    5            `           0    0    services_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.services_id_seq OWNED BY public.services.id;
          public          lucas    false    216            �            1259    16421    tokens    TABLE     V   CREATE TABLE public.tokens (
    user_id integer NOT NULL,
    token text NOT NULL
);
    DROP TABLE public.tokens;
       public         heap    lucas    false    5            �            1259    16420    tokens_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tokens_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.tokens_user_id_seq;
       public          lucas    false    219    5            a           0    0    tokens_user_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.tokens_user_id_seq OWNED BY public.tokens.user_id;
          public          lucas    false    218            �            1259    16397    users    TABLE       CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    phone bigint NOT NULL,
    cep integer NOT NULL,
    address text NOT NULL,
    "addressComplement" text NOT NULL,
    picture text
);
    DROP TABLE public.users;
       public         heap    lucas    false    5            �            1259    16396    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          lucas    false    5    215            b           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          lucas    false    214            �           2604    16409    services id    DEFAULT     j   ALTER TABLE ONLY public.services ALTER COLUMN id SET DEFAULT nextval('public.services_id_seq'::regclass);
 :   ALTER TABLE public.services ALTER COLUMN id DROP DEFAULT;
       public          lucas    false    217    216    217            �           2604    16424    tokens user_id    DEFAULT     p   ALTER TABLE ONLY public.tokens ALTER COLUMN user_id SET DEFAULT nextval('public.tokens_user_id_seq'::regclass);
 =   ALTER TABLE public.tokens ALTER COLUMN user_id DROP DEFAULT;
       public          lucas    false    218    219    219            �           2604    16400    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          lucas    false    214    215    215            V          0    16406    services 
   TABLE DATA           i   COPY public.services (id, "mainPhoto", title, description, phone, price, user_id, available) FROM stdin;
    public          lucas    false    217   �        X          0    16421    tokens 
   TABLE DATA           0   COPY public.tokens (user_id, token) FROM stdin;
    public          lucas    false    219   
!       T          0    16397    users 
   TABLE DATA           m   COPY public.users (id, name, email, password, phone, cep, address, "addressComplement", picture) FROM stdin;
    public          lucas    false    215   '!       c           0    0    services_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.services_id_seq', 1, false);
          public          lucas    false    216            d           0    0    tokens_user_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.tokens_user_id_seq', 1, false);
          public          lucas    false    218            e           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 1, true);
          public          lucas    false    214            �           2606    16414    services services_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.services DROP CONSTRAINT services_pkey;
       public            lucas    false    217            �           2606    16428    tokens tokens_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_pkey PRIMARY KEY (user_id);
 <   ALTER TABLE ONLY public.tokens DROP CONSTRAINT tokens_pkey;
       public            lucas    false    219            �           2606    16404    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            lucas    false    215            �           2606    16415    services services_user_id_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 H   ALTER TABLE ONLY public.services DROP CONSTRAINT services_user_id_fkey;
       public          lucas    false    215    3007    217            �           826    16391     DEFAULT PRIVILEGES FOR SEQUENCES    DEFAULT ACL     M   ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON SEQUENCES  TO lucas;
                   postgres    false                        826    16393    DEFAULT PRIVILEGES FOR TYPES    DEFAULT ACL     I   ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TYPES  TO lucas;
                   postgres    false            �           826    16392     DEFAULT PRIVILEGES FOR FUNCTIONS    DEFAULT ACL     M   ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON FUNCTIONS  TO lucas;
                   postgres    false            �           826    16390    DEFAULT PRIVILEGES FOR TABLES    DEFAULT ACL     J   ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES  TO lucas;
                   postgres    false            V      x������ � �      X      x������ � �      T   N   x�3��)MN,����9鹉�9z�����FƜF���&���FF�&�f����F��ŉ)i��)i�1~\1z\\\ ���     