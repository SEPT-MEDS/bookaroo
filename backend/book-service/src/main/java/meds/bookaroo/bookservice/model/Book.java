package meds.bookaroo.bookservice.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Book {
    private @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true)
    Long isbn;

    private String title;
    private String author;
    private String blurb;
    private int wordCount;

    public Book() {

    }

    public Book(Long isbn, String title, String author, String blurb, int wordCount) {
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.blurb = blurb;
        this.wordCount = wordCount;
    }

    public Long getIsbn() {
        return isbn;
    }

    public void setIsbn(Long isbn) {
        this.isbn = isbn;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getBlurb() {
        return blurb;
    }

    public void setBlurb(String blurb) {
        this.blurb = blurb;
    }

    public int getWordCount() {
        return wordCount;
    }

    public void setWordCount(int wordCount) {
        this.wordCount = wordCount;
    }

    @Override
    public boolean equals(Object other) {
        boolean isEqual;
        if (other == null || (other.getClass() != this.getClass()) || !((Book) other).getIsbn().equals(isbn)) {
            isEqual = false;
        } else {
            isEqual = true;
        }
        return isEqual;
    }

    @Override
    public int hashCode() {
        return Objects.hash(isbn);
    }

    @Override
    public String toString() {
        return "Book{" +
                "isbn=" + isbn +
                ", title='" + title + '\'' +
                ", author='" + author + '\'' +
                ", blurb='" + blurb + '\'' +
                ", wordCount=" + wordCount +
                '}';
    }
}
